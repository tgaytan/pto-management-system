import { useState, useRef } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // styling changes for calendar will be made in this file

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const solutions = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function Home() {

    // defining current year to use for maxDate prop in Calendar component
    const currentYear = new Date().getFullYear()
    const apiEndpoint = 'http://localhost:3001/api'

    const [peopleOff, setPeopleOff] = useState([])
    const dateRef = useRef('')

    const onClickGetAll = async(e) => {
        e.preventDefault()
        const response = await fetch(`${apiEndpoint}/getAllDaysOff`)
        const data = await response.json()
        setPeopleOff(data.daysOff)
    }

    const onClickDay = async (value, event) => {
        const numFormat = value.toLocaleDateString('en-US').replace(/\//g, '-') // this converts the selected date to 3/14/2024 and then removes the slashes and ends with 3-14-2024

        dateRef.current = numFormat
        const response = await fetch(`${apiEndpoint}/getDaysOff/${numFormat}`)
        const data = await response.json()
        setPeopleOff(data.daysOff)
    } 

    return (
        <>
            {/* <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <span>Solutions</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Popover.Button>
        
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            > */}
                {/* <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"> */}
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <Calendar maxDate={new Date(`12-31-${currentYear}`)} onClickDay={onClickDay}/>
                        </div>
                    {/* <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                        {solutions.map((item) => (
                            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                            </div>
                            <div>
                                <a href={item.href} className="font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                        {callsToAction.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                            <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            {item.name}
                            </a>
                        ))}
                        </div>
                    </div> */}
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <button
                                type="submit"
                                onClick={onClickGetAll}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Show All Days
                            </button>
                        </div> 
                        <div className="relative mt-2 rounded-md shadow-sm">
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
                    </div>
                </div>
                {/* </Popover.Panel>
            </Transition>
            </Popover> */}
        </>
    )
}

export default Home