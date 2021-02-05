const Post = require("../../models/post-model");
const ValidatePost = require("./post-validation");
const path = require('path');

exports.CreatePost = (req, res) => {
  const { error } = ValidatePost.CreatePost(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (!req.file) {
    console.log("please upload a file");
    return res.send('Please upload a file');
  };
 
  const post = new Post();

  post.titleUnit = req.body.titleUnit;
  post.locationUnit = req.body.locationUnit;
  post.descriptionUnit = req.body.descriptionUnit;
  post.categoryUnit = req.body.categoryUnit;
  post.guestsUnit = req.body.guestsUnit;
  post.bedroomsUnit = req.body.bedroomsUnit;
  post.bathroomsUnit = req.body.bathroomsUnit;
  post.amenitiesUnit = req.body.amenitiesUnit;
  post.imagesRentalUnit = req.file.path; //modified with the path to the images folder
  post.rentalPriceUnit = req.body.rentalPriceUnit;

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
    const posts = await Post.find();
    res.status(200).json({
      Message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json({
      Message: "Fetched Post successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      Message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.DeletePost = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id).then((deletedPost) => {
    if (!deletedPost) {
      return res.json({
        Message: "Not Found!",
        Date: null,
      });
    }
    res.json({
      Message: "Deleted!",
      Data: deletedPost,
    });
  });
};
