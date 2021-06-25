const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || secrate,
    {
      expiresIn: "30d",
    }
  );
};

module.exports.generateToken = generateToken;
