const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    userID: {
        type: String
    },
    titleUnit: {
        type: String,
        required: true
    },
    locationUnit:{
        type: String,
        required: true
    },
    typeUnit:{
        type: String,
        required: true
    },
    guestsUnit:{
        type: Number,
        required: true
    },
    bedroomsUnit:{
        type: Number,
        required: true
    },
    bathroomsUnit:{
        type: Number,
        required: true
    },
    amenitiesUnit:{
        type: String,
        required: true
    },
    ratingUnit: {
        type: Number
    },
    descriptionUnit:  {
        type: String
    },
    reviewsAtUnit: {
        type: String
    },
    imagesRentalUnit: {
        type: String
    }
})

