class InvalidCredentialError extends Error {
  constructor(message = 'Invalid Credentials.') {
    super();
    this.message = message;
    this.name = 'InvalidCredentialError';
  }
}

class InvalidTokenError extends Error {
  constructor(message = 'Invalid token.') {
    super();
    this.message = message;
    this.name = 'InvalidTokenError';
  }
}

class NotAuthenticatedError extends Error {
  constructor(message = 'Not authenticated.') {
    super();
    this.message = message;
    this.name = 'NotAuthenticatedError';
  }
}

module.exports = {
  InvalidCredentialError,
  InvalidTokenError,
  NotAuthenticatedError
};
