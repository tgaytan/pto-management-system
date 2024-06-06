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
        const daysOff = await DaysOff.find({ dayOff: req.params.date}).populate('employeeId')
        res.status(200).json({ daysOff })
    } catch(err) {
        res.status(500).json({ message: 'Request for Days Off failed' })
    }
})

router.post('/addDayOff', async (req, res) => {
    try {

        await DaysOff.create({
            employeeId: req.body.employeeId,
            dayOff: req.body.dayOff,
            hours: req.body.hours
        })

        res.status(200).json({ message: 'Request for Day Off Approved' })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'PTO Request Failed' })
    }
})

module.exports = router