const router = require('express').Router()
const { Employee } = require('../../models')
const { signToken } = require('../../utils/auth')

router.post('/login', async (req, res) => {
    try {
        const employee = await Employee.findOne({ email: req.body.email })
        const correctPw = await employee.isCorrectPassword(req.body.password)

        let token
        if (correctPw) {
            token = signToken(req.body.email)
        }

        res.status(200).json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' })
    }
})

module.exports = router