const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userID: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
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