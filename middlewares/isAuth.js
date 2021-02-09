const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.get("Authorization");
    let decodeToken;
    decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decodeToken.id;
    req.role = decodeToken.role;
  } catch (error) {
    console.log(error);
  }
  next();
};
