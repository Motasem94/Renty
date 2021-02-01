const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("./user-validation");
const User = require("../../models/user-model");
const bcrypt = require("bcrypt");

exports.RegisterUser = async (req, res) => {
  /* validation of the user data @ register */

  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ error: "Email already used" });
  }
  const password = await bcrypt.hash(req.body.password, 12);

  /* Adding the user to database */

  const user = new User();
  user.firstName = req.body.fName;
  user.lastName = req.body.lName;
  user.email = req.body.email;
  user.password = password;

  user
    .save()
    .then((response) => {
      res.json({
        Data: response,
        Message: "User registered successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  /* Redirect to Login Page */
};

exports.LoginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Wrong User" });
  }
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) {
    return res.status(400).json({ error: "Wrong Password" });
  }

  /* JWT Generate */
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token",token).json({
    Data: token,
    Message: "user login token"
  })

  /* Redirect to Home Page */
};

exports.GetUser = (req, res) => {};

exports.GetAllUsers = (req, res) => {};

exports.UpdateUser = (req, res) => {};

exports.DeleteUser = (req, res) => {};
