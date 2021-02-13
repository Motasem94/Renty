const Booking = require("../../models/booking-model");
const User = require("../../models/user-model");
const Post = require("../../models/post-model");

exports.CreateBooking = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    const post = await Post.findById(req.body.bookedPost);
    const checkin = new Date(req.body.checkIn);
    const checkout = new Date(req.body.checkOut);
    const calculatedAmount =
      mydiff(checkin, checkout, "days") * parseInt(post.rentalPriceUnit);
    if (post.userID.equals(req.userID)) {
      return res.status(400).json({
        error: "You book your own unit??",
      });
    }
    const booking = new Booking({
      bookingUser: req.userID,
      bookedPost: req.body.bookedPost,
      checkIn: checkin,
      checkOut: checkout,
      amount: calculatedAmount,
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

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginateBookings = {};

    if (endIndex < booking.length) {
      paginateBookings.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      paginateBookings.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    paginateBookings.bookings = booking.slice(startIndex, endIndex);
    res.status(200).json({
      Message: "Bookings fetched successfully",
      NumberOfAllBookings: booking.length,
      paginateBookings,
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

function mydiff(date1, date2, interval) {
  var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;
  date1 = new Date(date1);
  date2 = new Date(date2);
  var timediff = date2 - date1;
  if (isNaN(timediff)) return NaN;
  switch (interval) {
    case "years":
      return date2.getFullYear() - date1.getFullYear();
    case "months":
      return (
        date2.getFullYear() * 12 +
        date2.getMonth() -
        (date1.getFullYear() * 12 + date1.getMonth())
      );
    case "weeks":
      return Math.floor(timediff / week);
    case "days":
      return Math.floor(timediff / day);
    case "hours":
      return Math.floor(timediff / hour);
    case "minutes":
      return Math.floor(timediff / minute);
    case "seconds":
      return Math.floor(timediff / second);
    default:
      return undefined;
  }
}
