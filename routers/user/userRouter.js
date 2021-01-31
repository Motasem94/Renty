const express = require("express");
const UserCtrl = require('../../controllers/user/user-ctrl');
const router = express.Router();

router.post("/register",UserCtrl.RegisterUser);
router.post("/login",UserCtrl.LoginUser);
// router.get("/user/all",UserCtrl.GetAllUsers);
// router.get("/user/:id",UserCtrl.GetUser);
// router.patch("/user/update/:id",UserCtrl.UpdateUser);
// router.delete("/user/delete/:id",UserCtrl.DeleteUser);

module.exports = router;