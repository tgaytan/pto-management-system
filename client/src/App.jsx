import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Auth from './utils/auth'

function App() {

  useEffect(() => {
    Auth.getProfile()
  }, [])


  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
