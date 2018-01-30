const jwt = require('jsonwebtoken');

const config = require('../config');

const generateToken = (info) => {
  return jwt.sign(info, config.APP_SECRET, {
    expiresIn: 10800,
  });
};

module.exports = {
  login(req, res) {
    res.status(200).json({
      token: `Bearer ${generateToken(req.user)}`,
    });
  },
};