const db = require('./connection')
const { Employee, DaysOff } = require('../models')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
    await cleanDB('Employee', 'employees')
    await cleanDB('DaysOff', 'daysOff')

    await Employee.create({
        firstName: 'Trinidad',
        lastName: 'Gaytan',
        email: 'trinidad@test.com',
        password: 'password'
    })

    await Employee.create({
        firstName: 'Samantha',
        lastName: 'Losoya',
        email: 'samantha@test.com',
        password: 'password'
    })

    console.log('employees seeded')

    const employee = await Employee.findOne({ email: 'trinidad@test.com' })

    await DaysOff.create({
        employeeId: employee._id,
        dayOff: '10-11-2024',
        hours: 8
    })

    const employeeTwo = await Employee.findOne({ email: 'samantha@test.com' })

    await DaysOff.create({
        employeeId: employeeTwo._id,
        dayOff: '8-10-2024',
        hours: 8
    })

    console.log('days off seeded')

    process.exit()
})