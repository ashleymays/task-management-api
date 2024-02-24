import { StatusCodes } from 'http-status-codes';
import { request, expect, testUser } from 'api/test/setup';
import { app } from 'api/index';

let authorizationHeader;

export const _loginBeforeTests = (done) => {
  request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: testUser.email,
      password: testUser.password
    })
    .end((error, response) => {
      expect(error).to.be.null;
      authorizationHeader = response.headers.authorization;
      done();
    });
};

export const getUserDataForCorrectCredentials = (done) => {
  request(app)
    .get('/users/me')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', authorizationHeader)
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('email', testUser.email);
      expect(response._body).to.have.property('firstName', testUser.firstName);
      expect(response._body).to.have.property('lastName', testUser.lastName);
      expect(response._body).to.not.have.property('id');
      expect(response._body).to.not.have.property('password');
      done();
    });
};

export const jsonForCorrectCredentials = (done) => {
  request(app)
    .get('/users/me')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', authorizationHeader)
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.be.json;
      done();
    });
};

export const okStatusForCorrectCredentials = (done) => {
  request(app)
    .get('/users/me')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', authorizationHeader)
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(StatusCodes.OK);
      done();
    });
};
