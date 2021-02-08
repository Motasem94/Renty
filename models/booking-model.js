const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  checkIn: {
    type: Date,
    required: [true, "Check in date is required"],
  },
  checkOut: {
    type: Date,
    required: [true, "Check out date is required"],
  },
  amount: {
    type: Number,
    required: [true, "Total amount is required"],
  },
  guests: {
    type: Number,
    required: [true, "Number of guests is required"],
  },
  adults: {
    type: Number,
  },
  children: {
    type: Number,
    default: 0,
  },
});
