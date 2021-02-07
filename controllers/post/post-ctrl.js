const Post = require("../../models/post-model");
const ValidatePost = require("./post-validation");
const path = require('path');

exports.CreatePost = (req, res) => {
  const { error } = ValidatePost.CreatePost(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
 console.log(req.file.path);
 
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

  const currentPage= req.query.page || 1 ;  //in the front end we extract the query parameter which is called page 
  //this line of code means if this value is undefined "req.query.page" we would assign "one" to the variable 
  const perPage=2; //this 2 is hard coded , this value should match the value in the front end 

  let totalItems; //we will use this variable to store the number of items in the database
  
  Post.find().countDocuments()
  .then(count=>{
    totalItems=count;
    return Post.find()
    .skip((currentPage-1)*perPage)
    .limit(perPage)
  })
  .then(posts=>{
    res.status(200).json({
      Message:"Posts fetched successfully",
      posts : posts,
      totalItems:totalItems // this is added to the data i returned in the response ,the response is sent to the front end , code in front should look for this variable and use it 
    })
  })
  .catch(err=>{
    console.log(err);
  });

  // try {
  //   const posts = await Post.find();
  //   res.status(200).json({
  //     Message: "Posts fetched successfully",
  //     posts,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
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
