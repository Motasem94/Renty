const Booking = require("../../models/booking-model");
const User = require("../../models/user-model");
const Post = require("../../models/post-model");

exports.CreateBooking = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    const post = await Post.findById(req.body.bookedPost);
    if (post.userID.equals(req.userID)) {
      return res.status(400).json({
        error: "You book your own unit??",
      });
    }
    const booking = new Booking({
      bookingUser: req.userID,
      bookedPost: req.body.bookedPost,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      amount: req.body.amount,
      guests: req.body.guests,
      adults: req.body.adults,
      children: req.body.children,
    });
    booking
      .save()
      .then((response) => {
        res.json({
          Message: "Booking done successfully",
          Data: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    user.bookings.push(booking._id);
    post.bookings.push(booking._id);
    await user.save();
    await post.save();
  } catch (error) {
    console.log(error);
  }
};

exports.GetAllBooking = async (req, res) => {
  try {
    const booking = await Booking.find();
    res.status(200).json({
      Message: "Bookings fetched successfully",
      NumberOfBookings: booking.length,
      booking,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetBookingOfUnit = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id);
    res.status(200).json({
      Message: "Fetched Booking successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      Message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.CancelBooking = (req, res) => {
  const id = req.params.id;
  Booking.findByIdAndDelete(id).then((canceledBooking) => {
    if (!canceledBooking) {
      return res.json({
        Message: "Not Found!",
        Date: null,
      });
    }
    res.json({
      Message: "Deleted!",
      Data: canceledBooking,
    });
  });
};
