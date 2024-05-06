const router = require('express').Router()
const { Employee } = require('../../models')

router.post('/login', async (req, res) => {
    try {
        const employee = await Employee.findOne({ email: req.body.email })
        const correctPw = await employee.isCorrectPassword(req.body.password)

        res.status(200).json({ message: `correct password: ${correctPw}` })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' })
    }
})

module.exports = router