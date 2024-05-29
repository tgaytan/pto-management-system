const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        time: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        time: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        trim: true
    },
    remainingPTO: {
        type: Number,
        default: 200
    }
})

// set up pre-save middleware to create password
employeeSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10
		this.password = await bcrypt.hash(this.password, saltRounds)
	}

	next()
})

// compare the incoming password with the hashed password
employeeSchema.methods.isCorrectPassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

const Employee = model('Employee', employeeSchema)

module.exports = Employee