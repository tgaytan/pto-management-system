import { useState, useEffect } from 'react'
import Auth from '../utils/auth'

function MyRequest() {
    const employee = Auth.getProfile()
    const apiEndpoint = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'
    const [daysOff, setDaysOff] = useState([])

    // async function that is used to get all the days that the user has requested off
    const retrieveDays = async(apiEndpoint, employeeId) => {
        const response = await fetch(`${apiEndpoint}/getAllDaysOff/${employee.data._id}`)
        const data = await response.json()
        setDaysOff(data.daysOff)
    }

    // calling the retrieveDays function in useEffect. since function has setDaysOff 
    // function, I only want it to run once. or else it will loop
    useEffect(() => {
        retrieveDays(apiEndpoint, employee.data._id)
    }, [])

    // const response = await fetch(`${apiEndpoint}/getAllDaysOff/${employee.data._id}`)
    // const data = await response.json()

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        {daysOff.length > 0
                        ? (
                            <ul role="list" className="divide-gray-100">
                                {daysOff.map(day => (
                                    <li key={day.dayOff} className="flex justify-between gap-x-6 py-2">
                                        <div className="flex min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{day.dayOff.split('T')[0]}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                        : (
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                No Planned PTO
                            </h2>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyRequest