import jwt from 'jsonwebtoken';
import { UnauthorizedException } from 'api/shared/errors';

/**
 * @param {string} token
 * @returns {boolean}
 */
const isExpired = (token) => {
  const tokenExpirationTime = token.exp;
  return Date.now() > tokenExpirationTime;
};

/**
 * Checks that a user is authorized to access protected routes.
 *
 * @param {RequestHandler} req
 * @param {ResponseHandler} res
 * @param {NextFunction} next
 */
export const checkUserAuthorization = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    throw new UnauthorizedException();
  }

  const encodedUserToken = authHeader.split('Bearer ')[1];

  jwt.verify(encodedUserToken, process.env.SECRET_KEY, (error, userToken) => {
    if (error || isExpired(userToken)) {
      throw new UnauthorizedException();
    }
    req.user = { userId: userToken.userId };
    next();
  });
};
