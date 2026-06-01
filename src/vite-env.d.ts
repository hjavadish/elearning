/// <reference types="vite/client" />

interface Window {
  loadPyodide: (config?: { indexURL?: string }) => Promise<unknown>
}
