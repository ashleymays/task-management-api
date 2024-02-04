import { describe, it } from 'mocha';
import * as loginTests from './login.test';
import * as registerTests from './register.test';

describe('auth', () => {
  describe('/login', () => {
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
      "should return the user as an object for correct credentials given",
      loginTests.objectForCorrectCredentials
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
  });

  describe('/register', () => {
    it(
      'should return Invalid Credentials error for any missing credentials',
      registerTests.invalidCredentialsErrorForMissingCredentials
    );
  });
});