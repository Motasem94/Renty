const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    profilePic:  {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    about:  {
        type: String
    },
    languages: {
        type: String
    },
    reviewsByUser: {
        type: String
    },
    reviewsAtUser: {
        type: String
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema);
