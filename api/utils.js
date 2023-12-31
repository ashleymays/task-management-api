function catchAsync(asyncFn) {
  return async function (req, res, next) {
    try {
      return await asyncFn(req, res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { catchAsync };
