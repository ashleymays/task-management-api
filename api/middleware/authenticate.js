const jwt = require('jsonwebtoken');
const { STATUS_CODES } = require('../constants');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(STATUS_CODES.BAD_REQUEST).json(Error('Invalid token.'));
  }

  const user = jwt.verify(token, process.env.SECRET_KEY);
  if (!user) {
    res.status(STATUS_CODES.UNAUTHORIZED).json(Error('Not authenticated.'));
  }

  req.userId = user.userId;
  next();
};

module.exports = { verifyToken };
