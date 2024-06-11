import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Auth from './utils/auth'

function App() {

  useEffect(() => {
    Auth.getProfile() // running on first load to see if token is expired
  }, [])


  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
