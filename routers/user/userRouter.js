const express = require("express");
const UserCtrl = require("../../controllers/user/user-ctrl");
const router = express.Router();
const isAuth = require("../../middlewares/isAuth");
const isAdmin = require("../../middlewares/isAdmin");

router.post("/register", UserCtrl.RegisterUser);
router.post("/login", UserCtrl.LoginUser);
router.get("/user/all", isAuth, isAdmin, UserCtrl.GetAllUsers);
router.get("/user/:id", isAuth, UserCtrl.GetUser);
router.patch("/user/update/:id", isAuth, UserCtrl.UpdateUser);
router.delete("/user/delete/:id", isAuth, isAdmin, UserCtrl.DeleteUser);
router.patch("/post/image-profile/:id", isAuth, UserCtrl.ImageProfile);

module.exports = router;
