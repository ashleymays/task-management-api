import { STATUS_CODES } from 'api/shared/constants';

export const errorHandler = (error, req, res, next) => {
  console.log(error);
  res
    .status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json(error);
};
