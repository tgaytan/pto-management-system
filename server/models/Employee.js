const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const employeeSchema = new Schema({
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