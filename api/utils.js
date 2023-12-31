const catchAsync = (asyncFn) => {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { catchAsync };
