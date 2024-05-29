const db = require('./connection')
const { Employee, DaysOff } = require('../models')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
    await cleanDB('Employee', 'employees')
    await cleanDB('DaysOff', 'Daysoff')

    await Employee.create({
        firstName: 'Trinidad',
        lastName: 'Gaytan',
        email: 'test@test.com',
        password: 'password#1234'
    })

    console.log('employee seeded')

    process.exit()
})