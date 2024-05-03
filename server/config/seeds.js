const db = require('./connection')
const { Employee } = require('../models')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
    await cleanDB('Employee', 'employees')

    await Employee.create({
        email: 'test@test.com',
        password: 'password#1234'
    })

    console.log('employee seeded')

    process.exit()
})