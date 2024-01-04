const jwt = require('jsonwebtoken');
const { STATUSES } = require('../constants');

/*
    need to send client a jwt token after authentication
    authentication involves user logging in/signing up and a new jwt is created
    
    authorization involves checking if a token is valid before allowing them access
    if a user isn't authorized, then send them back to the login screen
*/

/**
 * Checks if a JWT is valid. Sends error if invalid.
 * @param { Request } req
 * @param { Response } res
 * @param { function } next
 */
const verifyToken = (req, res, next) => {
  const token = req.header('Bearer');

  if (!token) {
    res.status(STATUSES.BAD_REQUEST).json({ error: 'Invalid token.' });
  }

  const user = jwt.verify(token, process.env.SECRET_KEY);

  if (!user) {
    res.status(STATUSES.UNAUTHORIZED).json({ error: 'Not authorized' });
  }

  req.userId = user.userId;
  next();
};

/**
 * Returns a new JWT for the user.
 * @param { number } userId
 * @returns { string }
 */
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '15m' });
};

module.exports = { verifyToken, createToken };
