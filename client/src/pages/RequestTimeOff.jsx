import { useState, useRef } from 'react'
import Auth from '../utils/auth'
import Calendar from 'react-calendar'

function RequestTimeOff() {

    const [peopleOff, setPeopleOff] = useState([])
    const [isDayClicked, setIsDayClicked] = useState(false)
    const dateRef = useRef('')

    const { _id, firstName, lastName, remainingPTO } = Auth.getProfile().data

    const apiEndpoint = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'

    // defining maxDate and nextDay to be used for max/min date in Calendar component
    const currentYear = new Date().getFullYear()
    const maxDate = new Date(`12-31-${currentYear}`)
    const nextDay = new Date(Date.now() + (60 * 60 * 24 * 1000)) // adding an extra day in milliseconds

    // function that runs when a day in the calendar is clicked. it send a request to the backend to retrieve who is planned to be out that day
    const onClickDay = async (value, event) => {
        const numFormat = value.toLocaleDateString('en-US').replace(/\//g, '-') // this converts the selected date to 3/14/2024 and then removes the slashes and ends with 3-14-2024

        dateRef.current = numFormat
        const response = await fetch(`${apiEndpoint}/getDaysOff/${numFormat}`)
        const data = await response.json()
        setIsDayClicked(true)
        setPeopleOff(data.daysOff)
    }

    const onClickRequestDayOff = async(e) => {
        e.preventDefault()

        const response = await fetch(`${apiEndpoint}/addDayOff/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: _id,
                dayOff: dateRef.current,
                hours: 8,
                token: Auth.getToken()
            })
        })

        const data = await response.json()
        Auth.login(data.token) // updating token since the remainingPTO in the jwt payload has changed
        window.location.assign('/request-time-off-success')
    }

    // const people = [
    //         {
    //         name: 'Leslie Alexander',
    //         email: 'leslie.alexander@example.com',
    //         role: 'Co-Founder / CEO',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         lastSeen: '3h ago',
    //         lastSeenDateTime: '2023-01-23T13:23Z',
    //         },
    //         {
    //         name: 'Michael Foster',
    //         email: 'michael.foster@example.com',
    //         role: 'Co-Founder / CTO',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         lastSeen: '3h ago',
    //         lastSeenDateTime: '2023-01-23T13:23Z',
    //         },
    //         {
    //         name: 'Dries Vincent',
    //         email: 'dries.vincent@example.com',
    //         role: 'Business Relations',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         lastSeen: null,
    //         },
    //         {
    //         name: 'Lindsay Walton',
    //         email: 'lindsay.walton@example.com',
    //         role: 'Front-end Developer',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         lastSeen: '3h ago',
    //         lastSeenDateTime: '2023-01-23T13:23Z',
    //         },
    //         {
    //         name: 'Courtney Henry',
    //         email: 'courtney.henry@example.com',
    //         role: 'Designer',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         lastSeen: '3h ago',
    //         lastSeenDateTime: '2023-01-23T13:23Z',
    //         },
    //         {
    //         name: 'Tom Cook',
    //         email: 'tom.cook@example.com',
    //         role: 'Director of Product',
    //         imageUrl:
    //             'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //         lastSeen: null,
    //     },
    // ]

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                        </div> */}
                        <label htmlFor="employee" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                        </label>
                        <input
                        type="text"
                        name="employee-name"
                        id="employee"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={`${firstName} ${lastName}`}
                        />
                        {/* <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                            Currency
                        </label>
                        <select
                            id="currency"
                            name="currency"
                            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        >
                            <option>USD</option>
                            <option>CAD</option>
                            <option>EUR</option>
                        </select>
                        </div> */}
                    </div>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                        </div> */}
                        <label htmlFor="remainingPTO" className="block text-sm font-medium leading-6 text-gray-900">
                        Remaining Hours in PTO
                        </label>
                        <input
                        type="text"
                        name="remaining-PTO"
                        id="remainingPTO"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={remainingPTO}
                        />
                    </div>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <Calendar maxDate={maxDate} minDate={nextDay} onClickDay={onClickDay} />
                    </div>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        {isDayClicked === false 
                            ? '' 
                            : (<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                There are {5 - peopleOff.length} available spots for the selected day
                                </h2>)
                        }
                        <ul role="list" className="divide-gray-100">
                            {peopleOff.map((person) => (
                                <li key={person.employeeId.email} className="flex justify-between gap-x-6 py-2">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{`${person.employeeId.firstName} ${person.employeeId.lastName}`}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">{new Date(person.dayOff).toISOString().split('T')[0]}</p>
                                </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {peopleOff.length < 5 && isDayClicked === true 
                        ? (<form className="space-y-6">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={onClickRequestDayOff}
                                >
                                    Request Day Off
                                </button>
                            </form>)
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default RequestTimeOff