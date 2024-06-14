import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home'
import Login from './pages/LogIn.jsx'
import MyRequest from './pages/MyRequest'
import RequestTimeOff from './pages/RequestTimeOff'
import Success from './pages/Success'
import Error from './pages/Error'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/my-request',
        element: <MyRequest />
      },
      {
        path: '/request-time-off',
        element: <RequestTimeOff />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/request-time-off-success',
        element: <Success />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
