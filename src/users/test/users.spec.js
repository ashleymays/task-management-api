import { describe, it } from 'mocha';
import * as getTests from './get.test';

describe('Users', () => {
  before('login before accessing protected routes', getTests._loginBeforeTests);
  describe('GET /users/me', () => {
    it(
      'should get the user data for correct credentials',
      getTests.getUserDataForCorrectCredentials
    );
    it(
      'should return valid json for correct credentials',
      getTests.jsonForCorrectCredentials
    );
    it(
      'should return OK status for correct credentials',
      getTests.okStatusForCorrectCredentials
    );
  });
});
