const Joi = require('joi');
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phoneNo: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    Image: {
        type: String
    },
    city: {
        type: String
    },
    hobby: {
        type: Array
    }

});


module.exports = mongoose.model('User', registrationSchema);
module.exports = mongoose.model('Users', registrationSchema);


