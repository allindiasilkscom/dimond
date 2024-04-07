const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    course: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    }
});

// Create a model using the schema
const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;
