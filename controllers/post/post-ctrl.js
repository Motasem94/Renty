const Post = require("../../models/post-model");

exports.CreatePost = (req, res) => {
  const post = new Post();

  post.titleUnit = req.body.titleUnit;
  post.locationUnit = req.body.locationUnit;
  post.descriptionUnit = req.body.descriptionUnit;
  post.categoryUnit = req.body.categoryUnit;
  post.guestsUnit = req.body.guestsUnit;
  post.bedroomsUnit = req.body.bedroomsUnit;
  post.bathroomsUnit = req.body.bathroomsUnit;
  post.amenitiesUnit = req.body.amenitiesUnit;
  post.imagesRentalUnit = req.body.imagesRentalUnit;


  post
    .save()
    .then((response) => {
      res.json({
        Message: "Post created successfully",
        Data: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.GetAllPosts = (req, res) => {};

// exports.GetPost = (req, res) => {};

// exports.UpdatePost = (req, res) => {};

// exports.DeletePost = (req, res) => {};
