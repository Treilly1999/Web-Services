const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String
    },
    author: {
        type: String
    },
    posted: {
        type: Date
    },
    threadID: {
        type: String
    },
    userID: {
        type: String
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    }
});

const Comment = mongoose.model('comment', commentSchema, 'comments');

module.exports = Comment;