const { Schema, model } = require('mongoose')

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

const Employee = model('Employee', employeeSchema)

module.exports = Employee