import { describe, it } from 'mocha';
import * as loginTests from './login.test.js';

describe('auth', () => {
  describe('login', () => {
    it(
      'should return Invalid Credentials error for no email given',
      loginTests.noEmail
    );
    it(
      'should return Invalid Credentials error for no password given',
      loginTests.noPassword
    );
    it(
      'should return Not Found error for incorrect email given',
      loginTests.wrongEmail
    );
    it(
      'should return Invalid Credentials error for incorrect password given',
      loginTests.wrongPassword
    );
    it(
      'should return OK status for correct credentials given',
      loginTests.okStatusForCorrectCredentials
    );
    it(
      "should return the user's information in an object for correct credentials given",
      loginTests.returnObjectForCorrectCredentials
    );
  });
});
