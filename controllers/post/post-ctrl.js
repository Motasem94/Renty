const Post = require("../../models/post-model");
const ValidatePost = require("./post-validation");

exports.CreatePost = async (req, res) => {
  try{
  const { error } =  ValidatePost.CreatePost(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const titleUnit = req.body.titleUnit;
  const locationUnit = req.body.locationUnit;
  const descriptionUnit = req.body.descriptionUnit;
  const categoryUnit = req.body.categoryUnit;
  const guestsUnit = req.body.guestsUnit;
  const bedroomsUnit = req.body.bedroomsUnit;
  const bathroomsUnit = req.body.bathroomsUnit;
  const amenitiesUnit = req.body.amenitiesUnit;
  const rentalPriceUnit = req.body.rentalPriceUnit;

  const post = new Post({
    titleUnit: titleUnit,
    locationUnit: locationUnit,
    descriptionUnit: descriptionUnit,
    categoryUnit: categoryUnit,
    guestsUnit: guestsUnit,
    bedroomsUnit: bedroomsUnit,
    bathroomsUnit: bathroomsUnit,
    amenitiesUnit: amenitiesUnit,
    rentalPriceUnit: rentalPriceUnit,
  });

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
  }
  catch(err){
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
