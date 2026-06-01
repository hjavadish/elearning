/* Pyodide — اجرای پایتون در مرورگر (بارگذاری تنبل از CDN) */

const PYODIDE_VERSION = '0.26.4'
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

export interface RunResult {
  stdout: string
  stderr: string
  error: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PyodideInstance = any

interface PyodideRunPayload {
  stdout: string
  stderr: string
  error: string | null
}

let pyodidePromise: Promise<PyodideInstance> | null = null

/** تبدیل خروجی Pyodide (PyProxy) به آبجکت معمولی JS */
function parseRunPayload(raw: unknown): PyodideRunPayload {
  if (raw == null) {
    return { stdout: '', stderr: '', error: 'پاسخ خالی از محیط پایتون' }
  }

  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as PyodideRunPayload
    } catch {
      return { stdout: raw, stderr: '', error: null }
    }
  }

  // Pyodide PyProxy — toJs() or get()
  const proxy = raw as {
    toJs?: (opts?: { dict_converter?: unknown }) => PyodideRunPayload
    get?: (key: string) => unknown
  }

  if (typeof proxy.toJs === 'function') {
    const js = proxy.toJs({ dict_converter: Object.fromEntries })
    return {
      stdout: String(js.stdout ?? ''),
      stderr: String(js.stderr ?? ''),
      error: js.error != null ? String(js.error) : null,
    }
  }

  if (typeof proxy.get === 'function') {
    const err = proxy.get('error')
    return {
      stdout: String(proxy.get('stdout') ?? ''),
      stderr: String(proxy.get('stderr') ?? ''),
      error: err != null && err !== undefined ? String(err) : null,
    }
  }

  const obj = raw as Record<string, unknown>
  return {
    stdout: String(obj.stdout ?? ''),
    stderr: String(obj.stderr ?? ''),
    error: obj.error != null ? String(obj.error) : null,
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('بارگذاری Pyodide ناموفق بود'))
    document.head.appendChild(script)
  })
}

export function loadPyodide(): Promise<PyodideInstance> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(`${PYODIDE_CDN}pyodide.js`)
      const instance = await window.loadPyodide({
        indexURL: PYODIDE_CDN,
      })
      return instance
    })()
  }
  return pyodidePromise
}

export async function runPythonCode(
  code: string,
  mockInputs: string[] = [],
): Promise<RunResult> {
  const pyodide = await loadPyodide()

  try {
    await pyodide.loadPackagesFromImports(code)
  } catch {
    /* بسته اختیاری */
  }

  pyodide.globals.set('_user_code', code)
  pyodide.globals.set('_mock_inputs', mockInputs)

  try {
    const raw = await pyodide.runPythonAsync(`
import sys
import json
from io import StringIO

_inputs = list(_mock_inputs)
_input_i = [0]

def _mock_input(prompt=""):
    if _input_i[0] < len(_inputs):
        val = str(_inputs[_input_i[0]])
        _input_i[0] += 1
        if prompt:
            print(prompt, end="")
            print(val)
        return val
    return ""

_stdout = StringIO()
_stderr = StringIO()
_old_out, _old_err = sys.stdout, sys.stderr
sys.stdout, sys.stderr = _stdout, _stderr
_err = None
try:
    exec(_user_code, {"__name__": "__main__", "input": _mock_input})
except Exception as e:
    _err = f"{type(e).__name__}: {e}"
finally:
    sys.stdout, sys.stderr = _old_out, _old_err

json.dumps({
    "stdout": _stdout.getvalue(),
    "stderr": _stderr.getvalue(),
    "error": _err,
})
`)
    return parseRunPayload(raw)
  } catch (e) {
    return {
      stdout: '',
      stderr: '',
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export function checkTests(
  stdout: string,
  tests?: { expectedIncludes?: string[] },
): { passed: boolean; message: string } {
  if (!tests?.expectedIncludes?.length) {
    return { passed: true, message: '' }
  }
  const missing = tests.expectedIncludes.filter(
    (line) => !stdout.includes(line),
  )
  if (missing.length === 0) {
    return { passed: true, message: 'همه تست‌ها قبول شد! ✓' }
  }
  return {
    passed: false,
    message: `خروجی باید شامل این باشد: ${missing.join(' · ')}`,
  }
}
