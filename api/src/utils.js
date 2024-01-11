const catchAsyncErrors = (asyncFunction) => {
  return async (req, res, next) => {
    try {
      return await asyncFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const getAuthorizationCookie = () => {
  const MILLISECONDS_IN_MINUTE = 60 * 1000;
  return {
    name: '__main',
    options: {
      httpOnly: true,
      secure: true,
      maxAge: 2 * MILLISECONDS_IN_MINUTE
    }
  };
};

module.exports = {
  catchAsyncErrors,
  getAuthorizationCookie
};
