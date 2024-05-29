const jwt = require('jsonwebtoken')

const secret = 'thisISaSECRET'
const expiration = '8h'

module.exports = {
    signToken: function ({ _id, firstName, lastName, email, remainingPTO }) {
        const payload = { _id, firstName, lastName, email, remainingPTO }

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    }
}