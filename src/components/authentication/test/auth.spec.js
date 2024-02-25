import { describe, it } from 'mocha';
import * as loginTests from './login.test';
import * as registerTests from './register.test';
import * as logoutTests from './logout.test';

describe('Auth', () => {
  describe('POST /login', () => {
    it(
      'should return not found exception for no email given',
      loginTests.notFoundExceptionForNoEmail
    );
    it(
      'should return invalid input exception for no password given',
      loginTests.invalidInputExceptionForNoPassword
    );
    it(
      'should return not found exception for incorrect email given',
      loginTests.notFoundExceptionForWrongEmail
    );
    it(
      'should return invalid input exception for incorrect password given',
      loginTests.notFoundExceptionForWrongPassword
    );
    it(
      'should return OK status for correct credentials given',
      loginTests.okStatusForCorrectCredentials
    );
    it(
      'should return an authorization header with a bearer token for correct credentials given',
      loginTests.authHeaderForCorrectCredentials
    );
    it(
      'should return well-formed json for correct credentials given',
      loginTests.jsonForCorrectCredentials
    );
    it(
      'should return well-formed json for incorrect or missing credentials given',
      loginTests.jsonForIncorrectCredentials
    );
    it(
      'should return the user as an object for correct credentials given',
      loginTests.objectForCorrectCredentials
    );
  });

  describe('POST /register', () => {
    it(
      'should return invalid input exception for any missing required fields',
      registerTests.invalidInputExceptionForMissingCredentials
    );
  });

  describe('DELETE /logout', () => {
    it('should send No Content status', logoutTests.sendNoContentStatus);
    it('should send no body in the response', logoutTests.sendNoBodyInResponse);
    it(
      'should throw an Unauthorized error when trying to access a protected route',
      logoutTests.unauthorizedErrorForProtectedRoute
    );
  });
});
