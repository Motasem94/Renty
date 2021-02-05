const express = require("express");
const PostCtrl = require("../../controllers/post/post-ctrl");
const router = express.Router();
const isAuth = require("../../middlewares/is-auth");

router.post("/post/create", isAuth, PostCtrl.CreatePost);
router.get("/post/all", isAuth, PostCtrl.GetAllPosts);
router.get("/post/:id", isAuth, PostCtrl.GetPost);
router.patch("/post/update/:id", isAuth, PostCtrl.UpdatePost);
router.delete("/post/delete/:id", isAuth, PostCtrl.DeletePost);

module.exports = router;
