export class InvalidTokenError extends Error {
  constructor() {
    super();
    this.message = 'Invalid token.';
    this.name = 'InvalidTokenError';
  }
}

export class NotAuthenticatedError extends Error {
  constructor() {
    super();
    this.message = 'User is not authenticated.';
    this.name = 'NotAuthenticatedError';
  }
}