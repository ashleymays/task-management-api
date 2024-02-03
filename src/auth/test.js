import { describe, it } from 'mocha';
import * as baseChai from 'chai';
import chaiHttp from 'chai-http';
import { STATUS_CODES } from '../shared/constants.js';

const chai = baseChai.use(chaiHttp);

const url = 'https://task-management-app-lhvev.run-us-west2.goorm.site';

describe('auth', () => {
  describe('login', () => {
    it('should return NOT FOUND status for no email given', () => {
      chai
        .request(url)
        .post('/auth/login')
        .then((response) => {
          chai.expect(response).to.have.status(STATUS_CODES.NOT_FOUND);
          done();
        });
    });
  });
});
