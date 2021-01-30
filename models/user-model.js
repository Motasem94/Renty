const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
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
    profilePic:  {
        type: String
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
