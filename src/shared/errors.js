import { STATUS_CODES } from './constants';

export class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message || 'The requested information was not found.';
    this.name = 'NotFoundError';
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message) {
    super();
    this.message = message || 'The credentials you provided are invalid.';
    this.name = 'InvalidCredentialsError';
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.message =
      message || 'Sorry, you are not authorized to access this information.';
    this.name = 'ForbiddenError';
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}
