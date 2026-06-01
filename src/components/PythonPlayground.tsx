import { useState } from 'react'
import { checkTests, loadPyodide, runPythonCode } from '../lib/pyodide'
import type { PlaygroundTest } from '../types'
import '../styles/playground.css'

interface PythonPlaygroundProps {
  initialCode: string
  title?: string
  hint?: string
  mockInputs?: string[]
  tests?: PlaygroundTest
}

export function PythonPlayground({
  initialCode,
  title,
  hint,
  mockInputs = [],
  tests,
}: PythonPlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [testMsg, setTestMsg] = useState('')
  const [testOk, setTestOk] = useState<boolean | null>(null)
  const [running, setRunning] = useState(false)
  const [loadingEnv, setLoadingEnv] = useState(false)
  const [inputs, setInputs] = useState(mockInputs.join('\n'))
  const [envReady, setEnvReady] = useState(false)

  const handleRun = async () => {
    setRunning(true)
    setError(null)
    setTestMsg('')
    setTestOk(null)
    setOutput('')

    try {
      if (!envReady) {
        setLoadingEnv(true)
        await loadPyodide()
        setEnvReady(true)
        setLoadingEnv(false)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا در بارگذاری محیط پایتون')
      setRunning(false)
      setLoadingEnv(false)
      return
    }

    const inputLines = inputs
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const result = await runPythonCode(code, inputLines.length ? inputLines : mockInputs)

    const out = result.stdout.trim()
    const errOut = result.stderr.trim()

    if (result.error) {
      setError(result.error)
      setOutput(out || errOut)
    } else if (out) {
      setOutput(errOut ? `${out}\n${errOut}` : out)
    } else if (errOut) {
      setOutput(errOut)
    } else {
      setOutput('(بدون خروجی)')
      if (tests) {
        const check = checkTests(result.stdout, tests)
        setTestOk(check.passed)
        setTestMsg(check.message)
      }
    }
    setRunning(false)
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput('')
    setError(null)
    setTestMsg('')
    setTestOk(null)
    setInputs(mockInputs.join('\n'))
  }

  const needsInput = code.includes('input(')

  return (
    <div className="playground">
      <div className="playground-header">
        <span className="playground-label">🐍 محیط اجرای پایتون</span>
        {title && <span className="playground-title">{title}</span>}
      </div>

      {!envReady && (
        <p className="playground-env-hint">
          {loadingEnv
            ? 'در حال بارگذاری پایتون در مرورگر... (اولین بار کمی طول می‌کشد)'
            : 'با زدن «اجرا» محیط پایتون آماده می‌شود.'}
        </p>
      )}

      {hint && <p className="playground-hint">{hint}</p>}

      <label className="playground-editor-label">کد تو:</label>
      <textarea
        className="playground-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        dir="ltr"
        rows={Math.min(16, Math.max(6, code.split('\n').length + 1))}
      />

      {needsInput && (
        <div className="playground-inputs">
          <label>ورودی‌های آزمایشی (هر خط = یک input):</label>
          <textarea
            className="playground-inputs-field"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            dir="ltr"
            rows={3}
            placeholder={'علی\n15'}
          />
        </div>
      )}

      <div className="playground-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRun}
          disabled={running || loadingEnv}
        >
          {running ? 'در حال اجرا...' : '▶ اجرا'}
        </button>
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          بازنشانی
        </button>
        {tests && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleRun}
            disabled={running}
          >
            🧪 اجرا + تست
          </button>
        )}
      </div>

      {(output || error) && (
        <div className={`playground-output ${error ? 'playground-output--error' : ''}`}>
          <div className="playground-output-label">خروجی</div>
          <pre dir="ltr">{error ? error : output}</pre>
        </div>
      )}

      {testMsg && (
        <div className={`playground-test ${testOk ? 'playground-test--ok' : 'playground-test--fail'}`}>
          {testMsg}
        </div>
      )}
    </div>
  )
}
