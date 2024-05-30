const router = require('express').Router()
const { Employee, DaysOff } = require('../../models')
const { signToken } = require('../../utils/auth')

router.post('/login', async (req, res) => {
    try {
        const employee = await Employee.findOne({ email: req.body.email })
        const correctPw = await employee.isCorrectPassword(req.body.password)

        let token
        if (correctPw) {
            token = signToken(employee)
        }

        res.status(200).json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' })
    }
})

router.get('/getDaysOff/:date', async (req, res) => {
    try {
        console.log('/getDaysOff endpoint hit')
        console.log('params are: ', req.params)
        res.status(200).json({ message: 'endpoint hit' })
    } catch(err) {
        res.status(500).json({ message: 'Request for Days Off failed' })
    }
})

router.put('/addDayOff', async (req, res) => {
    try {
        console.log('/addDayOff endpoint hit')
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'PTO Request Failed' })
    }
})

module.exports = router