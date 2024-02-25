import { StatusCodes } from 'http-status-codes';
import { Prisma } from '@prisma/client';
import { InvalidInputException, GeneralException, NotFoundException } from 'api/shared/errors';

export const globalErrorHandler = (err, req, res, next) => {
  const error = isPrismaError(err) ? getProperErrorByPrismaError(err) : err;
  res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error);
};

const isPrismaError = (err) => {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientValidationError
  );
};

const getProperErrorByPrismaError = (err) => {
  switch (err.code) {
    case 'P2002':
      return new InvalidInputException(`Duplicate value: ${err.meta.target}`);
    case 'P2014':
      return new InvalidInputException(`Invalid ID: ${err.meta.target}`);
    case 'P2003':
      return new InvalidInputException(`Invalid input: ${err.meta.target}`);
    case 'P2025':
      return new NotFoundException();
    default:
      return new GeneralException();
  }
};
