import { StatusCodes } from 'http-status-codes';

// if it's a prisma error, then get the correct type (either not found or invalid input)
// all other errors are left with a default message "Something went wrong"
// use either given error code or the default INTERNAL_SERVER_ERROR

/**
 * @param {Error} error
 * @param {RequestHandler} req
 * @param {ResponseHandler} res
 * @param {NextFunction} next
 */
export const globalErrorHandler = (error, req, res, next) => {
  console.log(error);
  res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error);
};
