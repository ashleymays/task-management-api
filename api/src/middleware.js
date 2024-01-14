import jwt from 'jsonwebtoken';
import { STATUS_CODES } from '#constants';
import { NotAuthenticatedError, InvalidTokenError } from '#custom-errors';

/**
 * Used to check that a user is authenticated before giving
 * them access to protected routes.
 * @param { Request } req 
 * @param { Response } res 
 * @param { function } next 
 */
export const verifyToken = (req, res, next) => {
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