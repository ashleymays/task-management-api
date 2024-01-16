class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Resource not found.';
    this.name = 'NotFoundError';
  }
}

module.exports = { NotFoundError };