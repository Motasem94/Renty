const Post = require("../../models/post-model");
const ValidatePost = require("./post-validation");
const User = require("../../models/user-model");

exports.CreatePost = async (req, res) => {
  try {
    const { error } = ValidatePost.CreatePost(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const post = new Post({
      userID: req.userID,
      titleUnit: req.body.titleUnit,
      locationUnit: req.body.locationUnit,
      descriptionUnit: req.body.descriptionUnit,
      categoryUnit: req.body.categoryUnit,
      guestsUnit: req.body.guestsUnit,
      bedroomsUnit: req.body.bedroomsUnit,
      bathroomsUnit: req.body.bathroomsUnit,
      amenitiesUnit: req.body.amenitiesUnit,
      rentalPriceUnit: req.body.rentalPriceUnit,
    });
    const user = await User.findById(req.userID);
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
    user.posts.push(post._id);
    await user.save();
  } catch (err) {
    console.log(err);
  }
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

exports.UploadImage = async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.imagesRentalUnit.push(req.file.path);
    await post.save();
    res.status(200).json({
      Message: "Image uploaded successfully",
    });
  } catch (error) {
    console.log(error); 
  }
}