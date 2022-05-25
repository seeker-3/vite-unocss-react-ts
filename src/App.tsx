import { useState } from 'react'

// https://tailwindcss.com/
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header>
        <p className="text-red text-8">Hello Vite + React!</p>
        <p className="text-green text-3 bg-blue">
          <button
            className="hover:bg-pink px-4 py-2 rounded"
            type="button"
            onClick={() => setCount(count => count + 1)}
          >
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
