import { describe, it } from 'mocha';
import * as loginTests from './login.test';
import * as registerTests from './register.test';
import * as logoutTests from './logout.test';

describe('Auth', () => {
  describe('POST /login', () => {
    it(
      'should return Invalid Credentials error for no email given',
      loginTests.invalidCredentialsErrorForNoEmail
    );
    it(
      'should return Invalid Credentials error for no password given',
      loginTests.invalidCredentialsErrorForNoPassword
    );
    it(
      'should return Not Found error for incorrect email given',
      loginTests.notFoundErrorForWrongEmail
    );
    it(
      'should return Invalid Credentials error for incorrect password given',
      loginTests.notFoundErrorForWrongPassword
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
      'should return Invalid Credentials error for any missing credentials',
      registerTests.invalidCredentialsErrorForMissingCredentials
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
