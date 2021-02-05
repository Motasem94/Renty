const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    role: {
      type: String,
      default: "basic",
      enum: ["basic", "admin"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    profilePic: {
      type: String,
    },
    rating: {
      type: Number,
    },
    about: {
      type: String,
    },
    reviewsByUser: {
      type: String,
    },
    reviewsAtUser: {
      type: String,
    },
    address: {
      type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
