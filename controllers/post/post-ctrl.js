const Post = require("../../models/post-model");
const ValidatePost = require('./post-validation');

exports.CreatePost = (req, res) => {

  const { error } = ValidatePost.CreatePost(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const post = new Post();

  post.titleUnit = req.body.postTitle;
  post.locationUnit = req.body.postLocation;
  post.descriptionUnit = req.body.postDescription;
  post.categoryUnit = req.body.postCategory;
  post.guestsUnit = req.body.postGuests;
  post.bedroomsUnit = req.body.postBedrooms;
  post.bathroomsUnit = req.body.postBathrooms;
  post.amenitiesUnit = req.body.postAmenities;
  post.imagesRentalUnit = req.body.postImages;

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

exports.GetAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json({
      Message:"Posts fetched successfully",
      posts,
    })
  } catch (error) {
    console.log(error);
  }
};

// exports.GetPost = (req, res) => {};

// exports.UpdatePost = (req, res) => {};

// exports.DeletePost = (req, res) => {};
