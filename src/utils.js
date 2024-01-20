/**
 * Wraps an asynchronous function inside a try-catch block.
 * @param { function } asyncFn
 * @return { function } the asynchronous function inside a try-catch block.
 */
export const catchErrors = (asyncFn) => {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      next(error);
    }
  }
};