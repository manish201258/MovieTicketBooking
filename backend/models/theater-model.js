const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shows: {
        type: [String], // Updated to an array of strings
        required: true
    }
});

const Theaters = mongoose.model('Theaters', theaterSchema);

module.exports = Theaters;
