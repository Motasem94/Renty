const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoDB = 'mongodb+srv://motasem:Motasem123@cluster0.egyeq.mongodb.net/Renty?retryWrites=true&w=majority'

app.use(bodyParser.json());

app.post('/create', (req, res) => {

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
                Message: "Success"
            })
        })
        .catch(error => {
            console.log("Error");
        })
})

app.get('/', (req, res) => {
    Post.find()
        .then(foundedPosts => res.json({
            Data: foundedPosts,
            Message: "That's all posts in DB"

        }))
})

app.put('/:id', (req, res) => {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedPost => {
            res.json({
                Message: "Post have been updated",
                Data: updatedPost
            })
        })
})

app.delete('/:id', (req, res) => {
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


mongoose.connect(mongoDB,{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(error => console.log(error));




app.listen(4000, () => {
    console.log("Server @ 4000");
});