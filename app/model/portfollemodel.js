const { array } = require('@hapi/joi');
const mongoose = require('mongoose')

const portfolleSchema = new mongoose.Schema({
    projectCategory: {
        type: String
    },
    projectName: {
        type: String
    },
    projectTitle: {
        type: String
    },
    projectUrl: {
        type: String
    },
    projectDate: {
        type: String
    },
    projectImage: {
        type: Array
    },
});

module.exports = mongoose.model('portfolle', portfolleSchema);
