const mongoose = require('mongoose')

const contactusSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    massage: {
        type: String
    },
    phonenumber: {
        type: String
    },
    date: {
        type: String
    }

});

module.exports = mongoose.model('cantactus', contactusSchema);
