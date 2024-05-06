const router = require('express').Router()
const { Employee } = require('../../models')

router.post('/login', async (req, res) => {
    try {
        console.log('api/login route hit!')
        const employee = await Employee.findOne({ email: req.body.email })

        const correctPw = await employee.isCorrectPassword(req.body.password)
        console.log(correctPw)

        res.status(200).json({ message: 'route hit successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' })
    }
})

module.exports = router