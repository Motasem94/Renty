const express = require("express");
const PostCtrl = require("../../controllers/post/post-ctrl");
const router = express.Router();

router.post("/post/create", PostCtrl.CreatePost);
// router.get("/post/all", PostCtrl.GetAllPosts);
// router.get("/post/:id", PostCtrl.GetPost);
// router.patch("/post/update/:id", PostCtrl.UpdatePost);
// router.delete("/post/delete/:id", PostCtrl.DeletePost);

module.exports = router;
