const router = require('express').Router()

router.post('/login', (req, res) => {
    try {
        console.log('api/login route hit!')
        res.status(200).json({ message: 'route hit successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' })
    }
})

module.exports = router