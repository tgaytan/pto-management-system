const db = require('./connection')
const { Employee, DaysOff } = require('../models')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
    await cleanDB('Employee', 'employees')
    await cleanDB('DaysOff', 'daysOff')

    await Employee.create({
        firstName: 'Trinidad',
        lastName: 'Gaytan',
        email: 'test@test.com',
        password: 'password#1234'
    })

    console.log('employee seeded')

    const employee = await Employee.findOne({ email: 'test@test.com' })

    await DaysOff.create({
        employeeId: employee._id,
        dayOff: '10-11-2024',
        hours: 8
    })

    console.log('day off seeded')

    process.exit()
})