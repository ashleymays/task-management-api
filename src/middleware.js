import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split('Bearer ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      throw new Error();
    }
    req.user = { userId: decodedToken.userId };
    next();
  });
};
