const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const token = req.get('Authorization');
    let decodeToken;
    try {
        decodeToken = jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        console.log(error)
    }
    req.userID = decodeToken.id;
    next();
}