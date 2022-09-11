import { useCallback } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useNavigate } from 'react-router'
import { MouseEvent } from 'react'

function App() {
  const navigate = useNavigate()

  const onClickUserListLink = useCallback((e: MouseEvent) => {
    e.preventDefault()
    navigate("/users")
  }, [navigate])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <a href="/users" onClick={onClickUserListLink}>User List</a>
      </div>
    </div>
  )
}

export default App
