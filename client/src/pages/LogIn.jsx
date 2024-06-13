import { useState } from 'react'
import Auth from '../utils/auth'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleInputChange = e => {
        e.target.name === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)
    }
    
    const handleOnSubmit = async (e) => {
        e.preventDefault()

        if (Auth.loggedIn()) {
            Auth.logout()
        } else {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            
            Auth.login(data.token)
            window.location.assign('/')
        }

    }

    return (
        <>
            {/*
                leaving this here so I can remember why I added below config to index.html
                <html class="h-full bg-white">
                <body class="h-full">
            */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {Auth.loggedIn() ? '' : 'Sign in to your account'}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* removed action="#" and method="POST" from form element */}
                <form className="space-y-6" onSubmit={handleOnSubmit}>
                    {Auth.loggedIn() 
                    ? '' 
                    : (<>
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={handleInputChange}
                            value={email}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>
                            {/* <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleInputChange}
                            value={password}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>
                    </>)}

                        <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {Auth.loggedIn() ? 'Sign Out' : 'Sign in'}
                        </button>
                        </div> 
                </form>

                {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Start a 14 day free trial
                    </a>
                </p> */}
                </div>
            </div>
        </>
    )
}

export default Login