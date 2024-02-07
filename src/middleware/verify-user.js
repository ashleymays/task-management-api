import jwt from 'jsonwebtoken';
import { InvalidCredentialsError, ForbiddenError } from 'api/shared/errors';

export const verifyUser = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    throw new InvalidCredentialsError();
  }

  const token = authHeader.split('Bearer ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
    console.log(decodedToken.exp);
    if (error || isExpired(decodedToken)) {
      throw new ForbiddenError();
    }
    req.user = { userId: decodedToken.userId };
    next();
  });
};

const isExpired = (token) => {
  const tokenExpirationTime = token.exp;
  return new Date().getTime() > tokenExpirationTime;
};
