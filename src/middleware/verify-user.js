import jwt from 'jsonwebtoken';
import { UnauthorizedError } from 'api/shared/errors';

/**
 *
 * @param {string} token
 * @returns {boolean}
 */
const isExpired = (token) => {
  const tokenExpirationTime = token.exp;
  return Date.now() > tokenExpirationTime;
};

/**
 * Checks that a user is authenticated.
 *
 * @param {RequestHandler} req
 * @param {ResponseHandler} res
 * @param {NextFunction} next
 */
export const verifyUser = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const token = authHeader.split('Bearer ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
    if (error || isExpired(decodedToken)) {
      throw new UnauthorizedError();
    }
    req.user = { userId: decodedToken.userId };
    next();
  });
};
