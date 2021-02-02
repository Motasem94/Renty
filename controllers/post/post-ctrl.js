const Post = require("../../models/post-model");
const ValidatePost = require("./post-validation");

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
    const post = await Post.findByIdAndUpdate(id,req.body,{
      new: true
    });
    res.status(200).json({
      Message: "Post updated successfully",
      post,
    })
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
