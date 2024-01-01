const catchAsyncErrors = (asyncFunction) => {
  return async (req, res, next) => {
    try {
      return await asyncFunction(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { catchAsyncErrors };
