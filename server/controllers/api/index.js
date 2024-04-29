const router = require('express').Router()

router.post('/login', async (req, res) => {
    try {
        console.log('api/login route hit!')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' })
    }
})

module.exports = router