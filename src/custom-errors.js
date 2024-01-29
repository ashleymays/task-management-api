export class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Resource not found.';
    this.name = 'NotFoundError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super();
    this.message = 'Invalid credentials provided.';
    this.name = 'InvalidCredentialsError';
  }
}
