const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const friends = require('mongoose-friends');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    birthday: {
        type: Date,
        required: true
    },
    userLevel: {
        type: Number,
        default: 0
    }

},
    {collation: { locale: 'en_US', strength: 2}});

const options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
}

userSchema.plugin(passportLocalMongoose, options);
userSchema.plugin(friends({pathName: "foobar"}))
const User = mongoose.model('User', userSchema, 'User');

module.exports = User;