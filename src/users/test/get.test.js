import { request, expect, testUser } from 'api/test/setup';
import { STATUS_CODES } from 'api/shared/constants';
import { app } from 'api/index';

export const getUserDataForCorrectCredentials = (done) => {
  request(app)
    .post('/users/me')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'test-email@email.com',
      password: 'test-password'
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('email', 'test-email@email.com');
      expect(response._body).to.have.property('firstName', 'test-firstName');
      expect(response._body).to.have.property('lastName', 'test-lastName');
      expect(response._body).to.not.have.property('id');
      expect(response._body).to.not.have.property('password');
      done();
    });
};

export const jsonForCorrectCredentials = (done) => {};

export const okStatusForCorrectCredentials = (done) => {};

export const authHeaderForCorrectCredentials = (done) => {};
