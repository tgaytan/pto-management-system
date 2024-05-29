const router = require('express').Router()
const { Employee } = require('../../models')
const { signToken } = require('../../utils/auth')

router.post('/login', async (req, res) => {
    try {
        const employee = await Employee.findOne({ email: req.body.email })
        const correctPw = await employee.isCorrectPassword(req.body.password)
        const { _id, firstName, lastName, email, remainingPTO } = employee

        let token
        if (correctPw) {
            token = signToken({ _id, firstName, lastName, email, remainingPTO })
        }

        res.status(200).json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' })
    }
})

module.exports = router