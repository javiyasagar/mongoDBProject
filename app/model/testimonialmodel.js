const mongoose = require('mongoose')

const tastimonialSchema = new mongoose.Schema({
    testimonialName: {
        type: String
    },
    designation: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
});

module.exports = mongoose.model('tastimonial', tastimonialSchema);
