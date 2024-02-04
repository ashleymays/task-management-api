import { chai, expect } from '../setup';
import { STATUS_CODES } from '../../constants';
import { app } from '../../index';

/**
 * Should return Invalid Credentials error for any missing credentials.
 *
 * @param { function } done - required for chai-http
 */
export const invalidCredentialsErrorForMissingCredentials = (done) => {
  chai
    .request(app)
    .post('/auth/register')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'email@email.com'
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('name');
      expect(response._body.name).to.equal('InvalidCredentialsError');
      done();
    });
};

/**
 * Should return Created status for correct credentials provided.
 *
 * @param { function } done - required for chai-http
 */
export const createdStatusForCorrectInformation = (done) => {
  chai
    .request(app)
    .post('/auth/register')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'test-email@email.com',
      password: 'test-password',
      firstName: 'test-firstName',
      lastName: 'test-lastName'
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.CREATED);
      done();
    });
};

/**
 * Should return user in response body for correct credentials.
 *
 * @param { function } done - required for chai-http
 */
export const userInResponseBodyForCorrectCredentials = (done) => {
  const testUser = {
    email: 'test-email@email.com',
    password: 'test-password',
    firstName: 'test-firstName',
    lastName: 'test-lastName'
  };

  chai
    .request(app)
    .post('/auth/register')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(testUser)
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('email', testUser.email);
      expect(response._body).to.have.property('firstName', testUser.firstName);
      expect(response._body).to.have.property('lastName', testUser.lastName);
      expect(response._body).to.not.have.property('password');
      expect(response._body).to.not.have.property('id');
      done();
    });
};

/**
 * Should return an authorization header with a bearer token for correct credentials.
 *
 * @param { function } done - required for chai-http
 */
export const authHeaderForCorrectCredentials = (done) => {
  chai
    .request(app)
    .post('/auth/register')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'test-email@email.com',
      password: 'test-password',
      firstName: 'test-firstName',
      lastName: 'test-lastName'
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response.headers).to.have.property('authorization');
      expect(response.headers.authorization).to.be.a('string');
      expect(response.headers.authorization).to.include('Bearer ');
      done();
    });
};
