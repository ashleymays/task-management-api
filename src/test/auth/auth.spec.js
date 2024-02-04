import { describe, it } from 'mocha';
import * as loginTests from './login.test';
import * as registerTests from './register.test.js';

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
      "should return the user's information in an object for correct credentials given",
      loginTests.returnObjectForCorrectCredentials
    );
    it(
      'should return an authorization header for correct credentials given',
      loginTests.returnAuthHeaderForCorrectCredentials
    );
  });

  describe('/register', () => {
    it(
      'should return Invalid Credentials error for any missing credentials',
      registerTests.invalidCredentialsErrorForMissingCredentials
    );
  });
});
