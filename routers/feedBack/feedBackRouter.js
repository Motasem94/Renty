const express = require("express");
const router = express.Router();
const isAuth = require("../../middlewares/isAuth");
const isAdmin = require("../../middlewares/isAdmin");
const feedBackCtrl = require("../../controllers/feedBack/feedBack-ctrl");

router.post("/feedback", isAuth, feedBackCtrl.CreateFeedBack);
// router.get("/feedback/:postid", isAuth, feedBackCtrl.GetFeedBack);
// router.delete("/feedback/:postid", isAuth, isAdmin, feedBackCtrl.DeleteFeedBack);

module.exports = router;
