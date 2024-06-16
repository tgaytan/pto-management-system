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
        const daysOff = await DaysOff.find({ dayOff: req.params.date }).populate('employeeId')
        res.status(200).json({ daysOff })
    } catch(err) {
        res.status(500).json({ message: 'Request for Days Off failed' })
    }
})

router.get('/getAllDaysOff', async (req, res) => {
    try {
        const daysOff = await DaysOff.find({}).populate('employeeId').sort({ dayOff: -1 })
        res.status(200).json({ daysOff })
    } catch(err) {
        res.status(500).json({ message: 'request failed' })
    }
})

router.get('/getAllDaysOff/:employeeId', async (req, res) => {
    try {
        const daysOff = await DaysOff.find({ employeeId: req.params.employeeId })
        res.status(200).json({ daysOff })
    } catch(err) {
        res.status(500).json({ message: 'Request for Days off failed' })
    }
})

router.post('/addDayOff', async (req, res) => {
    try {
        // getting amount of PTO left over
        let employee = await Employee.findOne({ _id: req.body.employeeId })
        const { remainingPTO } = employee // defining this variable so I can assign the new updated employee document to it. then use it to sign a new jwt token

        // checks if the user has enough PTO hours to request a day off. if they do, it subtracts it from their current hours and add the day off
        if (remainingPTO < req.body.hours) {
            res.status(403).json({ message: 'Not enough hours remaining', token: req.body.token })
            return
        } else {
            employee = await Employee.findOneAndUpdate(
                { _id: req.body.employeeId }, 
                { remainingPTO: remainingPTO - req.body.hours }, 
                { returnDocument: 'after' }
            )
            await DaysOff.create({
                employeeId: req.body.employeeId,
                dayOff: req.body.dayOff,
                hours: req.body.hours
            })
        }

        const token = signToken(employee)

        res.status(200).json({ message: 'Request for Day Off Approved', token })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'PTO Request Failed' })
    }
})

module.exports = router