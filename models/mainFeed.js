const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    userID: {
        type: String
    },
    posted: {
        type: Date
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    }
});

const Feed = mongoose.model('mainFeed', feedSchema, 'mainFeed');

module.exports = Feed;