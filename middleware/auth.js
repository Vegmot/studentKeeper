const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if !token
  if (!token) {
    return res.status(401).json({ msg: 'No token; authorisation denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};