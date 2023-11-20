import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <p className="read-the-docs">
              Click on the logos to see the Code, Project and Issues on Github
          </p>
        <a href="https://github.com/SchulzEnrico/ESourc-es-" target="_blank">
          <img title={"View Code on Github"} src="../public/icons/github.png" className="logo" alt="View Code on Github" />
        </a>
          <a href="https://github.com/users/SchulzEnrico/projects/3" target="_blank">
              <img title={"Project on Github"} src="../public/icons/compass-red.png" className="logo" alt="Project on Github" />
          </a>
          <a href="https://github.com/SchulzEnrico/ESourc-es-/issues" target="_blank">
              <img title={"Issues on Github"} src="../public/icons/dash-black.png" className="logo" alt="Issues on Github" />
          </a>
      </div>
      <h1>E-Sourc(es)</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
