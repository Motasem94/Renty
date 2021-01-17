const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


/* The Collections in Database */

const Post = require('./models/post');
const User = require('./models/user');
const user = require('./models/user');

/**********************************/

const mongoDB = 'mongodb+srv://motasem:Motasem123@cluster0.egyeq.mongodb.net/Renty?retryWrites=true&w=majority'

app.use(bodyParser.json());

/*

The Following is Create,Read,Update,Delete CRUD API for *** Posts ***

*/

app.post('/create/post', (req, res) => {

    const userID = req.body.userID;
    const titleUnit = req.body.titleUnit;
    const locationUnit = req.body.locationUnit;
    const typeUnit = req.body.typeUnit;
    const guestsUnit = req.body.guestsUnit;
    const bedroomsUnit = req.body.bedroomsUnit;
    const bathroomsUnit = req.body.bathroomsUnit;
    const amenitiesUnit = req.body.amenitiesUnit;
    const descriptionUnit = req.body.descriptionUnit;
    const imagesRentalUnit = req.body.imagesRentalUnit;

    const post = new Post();

    post.userID = userID;
    post.titleUnit = titleUnit;
    post.locationUnit = locationUnit;
    post.typeUnit = typeUnit;
    post.guestsUnit = guestsUnit;
    post.bedroomsUnit = bedroomsUnit;
    post.bathroomsUnit = bathroomsUnit;
    post.amenitiesUnit = amenitiesUnit;
    post.descriptionUnit = descriptionUnit;
    post.imagesRentalUnit = imagesRentalUnit;

    post.save()

        .then(response => {
            res.json({
                Data: response,
                Message: "Post: Success add"
            })
        })
        .catch(error => {
            console.log("Error");
        })
})

app.get('/posts', (req, res) => {
    Post.find()
        .then(foundedPosts => res.json({
            Data: foundedPosts,
            Message: "That's all * Posts * in DB"

        }))
})

app.put('/posts/:id', (req, res) => {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, {
            new: true
        })
        .then(updatedPost => {
            res.json({
                Message: "Post have been updated",
                Data: updatedPost
            })
        })
})

app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;

    Post.findByIdAndDelete(id)
        .then(deletedPost => {
            if (!deletedPost) {
                return res.json({
                    Message: "Not Found!",
                    Date: null
                })
            }
            res.json({
                Message: "Deleted!",
                Data: deletedPost
            })
        })
})


/*

The Following is Create,Read,Update,Delete CRUD API for *** Users ***

*/

app.post('/create/user', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const profilePic = req.body.profilePic;
    const rating = req.body.rating;
    const about = req.body.about;
    const languages = req.body.languages;
    const reviewsByUser = req.body.reviewsByUser;
    const reviewsAtUser = req.body.reviewsAtUser;
    const address = req.body.address;

    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.profilePic = profilePic;
    user.rating = rating;
    user.about = about;
    user.languages = languages;
    user.reviewsByUser = reviewsByUser;
    user.reviewsAtUser = reviewsAtUser;
    user.address = address;

    user.save()
        .then(response => {
            res.json({
                Data: response,
                Message: "User: Success add"
            })
        })
        .catch(error => {
            console.log(error);
        })

})

app.get('/users', (req, res) => {
    user.find()
        .then(foundedUsers => res.json({
            Data: foundedUsers,
            Message: "That's all * Users * in DB"

        }))
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        .then(updatedUser => {
            res.json({
                Message: "User have been updated",
                Data: updatedUser
            })
        })
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.json({
                    Message: "Not Found!",
                    Date: null
                })
            }
            res.json({
                Message: "Deleted!",
                Data: deletedUser
            })
        })
})

mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(error => console.log(error));




app.listen(4000, () => {
    console.log("Server @ 4000");
});