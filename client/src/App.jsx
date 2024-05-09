import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Auth from './utils/auth'

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
