/**
 * Wraps asynchronous errors in a try-catch block
 * and automatically calls the next function.
 *
 * @param {RequestHandler} asyncFn
 * @returns {Promise<void>}
 */
export const catchErrors = (asyncFn) => {
  return async (req, res, next) => {
    try {
      await asyncFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
