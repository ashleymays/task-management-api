import { describe, it } from 'mocha';
import * as getTests from './get.test';

describe('Users', () => {
  describe('GET /users/me', () => {
    it(
      'should get the user data for correct credentials',
      getTests.getUserDataForCorrectCredentials
    );
    // it(
    //   'should return valid json for correct credentials',
    //   getTests.jsonForCorrectCredentials
    // );
    // it(
    //   'should return OK status for correct credentials',
    //   getTests.okStatusForCorrectCredentials
    // );
    // it(
    //   'should return auth header for correct credentials',
    //   getTests.authHeaderForCorrectCredentials
    // );
  });
});
