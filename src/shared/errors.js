import { STATUS_CODES } from './constants';

export class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'The requested information was not found.';
    this.name = 'NotFoundError';
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message) {
    super();
    this.message = 'The credentials you provided are invalid.';
    this.name = 'InvalidCredentialsError';
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = 'Sorry, you are not authorized to access this information.';
    this.name = 'ForbiddenError';
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}