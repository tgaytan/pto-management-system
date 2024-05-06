const jwt = require('jsonwebtoken')

const secret = 'thisISaSECRET'
const expiration = '8h'

module.exports = {
    signToken: function ({ email }) {
        const payload = { email }

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    }
}