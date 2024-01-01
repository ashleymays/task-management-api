/**
 * Wraps an asynchronous function in a try-catch block and automatically checks for errors.
 * Reduces redundancy.
 * @param { function } asyncFunction
 * @returns { Promise }
 */
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
