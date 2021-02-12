const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.get("Authorization");
    if (!token) {
      return res.status(404).json({
        Message: "Not found",
      });
    }
    let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decodeToken.id;
    req.role = decodeToken.role;
    next();
  } catch (error) {
    console.log(error);
  }
};
