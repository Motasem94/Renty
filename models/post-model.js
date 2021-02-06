const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    statusUnit: {
      type: String,
      default: "pending",
      enum: ["pending", "reject","approve"],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    titleUnit: {
      type: String,
      required: true,
    },
    locationUnit: {
      type: String,
      required: true,
    },
    categoryUnit: {
      type: String,
      required: true,
    },
    guestsUnit: {
      type: Number,
      required: true,
    },
    bedroomsUnit: {
      type: Number,
      required: true,
    },
    bathroomsUnit: {
      type: Number,
      required: true,
    },
    amenitiesUnit: [String],
    ratingUnit: {
      type: Number,
    },
    descriptionUnit: {
      type: String,
    },
    reviewsAtUnit: {
      type: String,
    },
    imagesRentalUnit: [String],
    rentalPriceUnit: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
