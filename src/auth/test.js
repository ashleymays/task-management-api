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
        .end((error, response) => {
          if (error) {
            throw error;
          }
          chai.expect(response).to.have.status(STATUS_CODES.NOT_FOUND);
        });
    });

    it('should return NOT FOUND status for non-existent user', () => {
      const body = {
        email: 'wrongemail@email.com'
      };
      chai
        .request(url)
        .post('/auth/login')
        .send(body)
        .end((error, response) => {
          if (error) {
            throw error;
          }
          chai.expect(response).to.have.status(STATUS_CODES.NOT_FOUND);
        });
    });

    it('should return BAD REQUEST status for wrong password', () => {
      const body = {
        email: 'email@email.com',
        password: 'wrong-password'
      };
      chai
        .request(url)
        .post('/auth/login')
        .send(body)
        .end((error, response) => {
          if (error) {
            throw error;
          }
          chai.expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
        });
    });

    it('should return OK status for correct credentials and existing user', () => {
      const body = {
        email: 'email@email.com',
        password: 'password123'
      };
      chai
        .request(url)
        .post('/auth/login')
        .send(body)
        .end((error, response) => {
          if (error) {
            throw error;
          }
          chai.expect(response).to.have.status(STATUS_CODES.OK);
        });
    });
  });
});
