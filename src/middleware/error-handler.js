export const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json(error);
};
