const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    topic:{
        type: String,
        required: true
    },
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


},
    {collation: { locale: 'en_US', strength: 2}});

threadSchema.index({body: 'text'})
const Thread = mongoose.model('Thread', threadSchema, 'Thread');

module.exports = Thread;