import Auth from '../utils/auth'
import Calendar from 'react-calendar'

function RequestTimeOff() {

    // defining maxDate and nextDay to be used for max/min date in Calendar component
    const currentYear = new Date().getFullYear()
    const maxDate = new Date(`12-31-${currentYear}`)
    const nextDay = new Date(Date.now() + (60 * 60 * 24 * 1000)) // adding an extra day in milliseconds

    const onClickDay = async (value, event) => {
        console.log('clicked day: ', value)
        const numFormat = value.toLocaleDateString('en-US').replace(/\//g, '') // this converts the selected date to 3/14/2024 and then removes the slashes and ends with 3142024

        const response = await fetch(`http://localhost:3001/api/getDaysOff/${numFormat}`)
        const data = await response.json()
        console.log(data)
    } 

    const { firstName, lastName, remainingPTO } = Auth.getProfile().data

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <label htmlFor="employee" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        {/* <span className="text-gray-500 sm:text-sm">$</span> */}
                        </div>
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
                    <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                        <Calendar maxDate={maxDate} minDate={nextDay} onClickDay={onClickDay} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestTimeOff