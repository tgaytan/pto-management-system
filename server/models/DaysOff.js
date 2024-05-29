const { Schema, model } = require('mongoose')

const daysOffSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    dayOff: {
        type: Date,
        required: true
    },
    hours: {
        type: Number,
        required: true
    }
})

const DaysOff = model('DaysOff', daysOffSchema, 'daysOff')

module.exports = DaysOff