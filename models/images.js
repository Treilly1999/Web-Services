const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    userID: {
        type: String
    }
});

const Image = mongoose.model('images', imageSchema, 'images');

module.exports = Image;