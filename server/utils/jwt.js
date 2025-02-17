const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.name },
    process.env.ACCESS_TOKEN_SECRET,
   
  );
};

module.exports = { generateAccessToken };
