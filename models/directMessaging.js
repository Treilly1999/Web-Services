const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String
    },
    sender: {
        type: String
    },
    receiver: {
        type: String
    }
});

const Message = mongoose.model('Message', messageSchema, 'Message');

module.exports = Message;