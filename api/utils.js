const jwt = require('jsonwebtoken');

const catchAsyncErrors = (asyncFunction) => {
  return async (req, res, next) => {
    try {
      return await asyncFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const createUserToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '15m' });
};

const getUserCookieOptions = () => {
  return {
    name: 'Auth',
    options: {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 1000
    }
  }
};

module.exports = {
  catchAsyncErrors,
  createUserToken,
  getUserCookieOptions
};
