const express = require("express");
const BookingCtrl = require("../../controllers/booking/booking-ctrl");
const router = express.Router();
const isAuth = require("../../middlewares/isAuth");
const isAdmin = require("../../middlewares/isAdmin");
const upload = require("../../middlewares/upload");






module.exports = router;