const express = require("express");
const PostCtrl = require("../../controllers/post/post-ctrl");
const router = express.Router();
const isAuth = require("../../middlewares/isAuth");
const isAdmin = require("../../middlewares/isAdmin");

router.post("/post/create", isAuth, PostCtrl.CreatePost);
router.get("/post/all", isAuth, isAdmin, PostCtrl.GetAllPosts);
router.get("/post/:id", isAuth, PostCtrl.GetPost);
router.patch("/post/update/:id", isAuth, PostCtrl.UpdatePost);
router.delete("/post/delete/:id", isAuth, PostCtrl.DeletePost);
router.patch("/post/image-upload/:id", isAuth, PostCtrl.UploadImage);

module.exports = router;
