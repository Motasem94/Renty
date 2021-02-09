const Booking = require('../../models/booking-model');
const User = require('../../models/user-model');
const Post = require('../../models/post-model');

exports.CreateBooking = async (req,res)=>{
    try {
        const user = await User.findById(req.userID);
        const post = await Post.findById(req.body.bookedPost);
        console.log("user: "+req.userID);
        console.log("post: "+post.userID);
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
            children: req.body.children
        })
        booking.save()
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
}

exports.GetAllBooking = (req,res)=>{

}

exports.GetBookingOfUnit = (req,res)=>{

}

exports.UpdateBooking = (req,res)=>{

}

exports.DeleteBooking = (req,res)=>{

}