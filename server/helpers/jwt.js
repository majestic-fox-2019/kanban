const jwt = require('jsonwebtoken');

module.exports = {
  signToken: function (obj) {
    return jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: "6h" });
  },
  verifyToken: function (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};
