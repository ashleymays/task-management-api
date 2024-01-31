import { STATUS_CODES } from './constants';

export class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Resource not found.';
    this.name = 'NotFoundError';
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super();
    this.message = 'Invalid credentials provided.';
    this.name = 'InvalidCredentialsError';
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}
