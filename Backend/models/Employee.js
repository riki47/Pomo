const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    focus: {
        type : Number,
        default : 25
    },
    break: {
        type:Number,
        default : 5
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
    