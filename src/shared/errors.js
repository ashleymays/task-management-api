/**
 * An exception indicating that a resource was not found.
 * 
 * @class
 * @example
 * new NotFoundException(); // message is 'Sorry, the resource you requested was not found.'
 * new NotFoundException('User was not found.'); // message is 'User was not found.'
 */
export class NotFoundException extends Error {
  constructor(message = 'Sorry, the resource you requested was not found.') {
    super();
    this.message = message;
    this.name = 'NotFoundException';
    this.code = '404';
  }
}

/**
 * An exception indicating that any provided input was invalid.
 * 
 * @class
 * @example
 * new InvalidInputException(); // message is 'The value you provided was invalid.'
 * new InvalidInputException('Email cannot be null.'); // message is 'Email cannot be null.'
 */
export class InvalidInputException extends Error {
  constructor(message = 'The value you provided was invalid.') {
    super();
    this.message = message;
    this.name = 'InvalidInputException';
    this.code = '400';
  }
}

/**
 * An exception indicating that a user is unauthorized.
 * 
 * @class
 * @example
 * new UnauthorizedException(); // message is 'You are not authorized to access this resource.'
 * new UnauthorizedException('Please log in.'); // message is 'Please log in.'
 */
export class UnauthorizedException extends Error {
  constructor(message = 'You are not authorized to access this resource.') {
    super();
    this.message = message;
    this.name = 'UnauthorizedException';
    this.code = '401';
  }
}