const jwt = require('jsonwebtoken');
const { STATUS_CODES } = require('./constants');
const { NotAuthenticatedError, InvalidTokenError } = require('./custom-errors');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(STATUS_CODES.BAD_REQUEST).json(new InvalidTokenError());
  }

  const userId = jwt.verify(token, process.env.SECRET_KEY);
  if (!userId) {
    res.status(STATUS_CODES.UNAUTHORIZED).json(new NotAuthenticatedError());
  }

  req.user.id = userId;
  next();
};

module.exports = { verifyToken };
