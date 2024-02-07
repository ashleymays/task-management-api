import { chai, expect } from 'api/test/setup';
import { STATUS_CODES } from 'api/shared/constants';
import { app } from 'api/index';

const validTestUser = {
  email: 'test-email@email.com',
  password: 'test-password',
  firstName: 'test-firstName',
  lastName: 'test-lastName'
};

/**
 * Should return Invalid Credentials error for no email given.
 *
 * @param { function } done - required for chai-http
 */
export const invalidCredentialsErrorForNoEmail = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({})
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
 * Should return Invalid Credentials error for no password given.
 *
 * @param { function } done - required for chai-http
 */
export const invalidCredentialsErrorForNoPassword = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: validTestUser.email
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
 * Should return Not Found error for incorrect email given.
 *
 * @param { function } done - required for chai-http
 */
export const notFoundErrorForWrongEmail = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'wrong-email@nothing.com',
      password: validTestUser.password
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.NOT_FOUND);
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('name');
      expect(response._body.name).to.equal('NotFoundError');
      done();
    });
};

/**
 * Should return Invalid Credentials error for incorrect password given.
 *
 * @param { function } done - required for chai-http
 */
export const notFoundErrorForWrongPassword = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: validTestUser.email,
      password: 'wrong-password'
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property(
        'name',
        'InvalidCredentialsError'
      );
      done();
    });
};

/**
 * Should return OK status for correct credentials given.
 *
 * @param { function } done - required for chai-http
 */
export const okStatusForCorrectCredentials = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: validTestUser.email,
      password: validTestUser.password
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.OK);
      done();
    });
};

/**
 * Should return an authorization header for correct credentials given.
 *
 * @param { function } done - required for chai-http
 */
export const authHeaderForCorrectCredentials = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: validTestUser.email,
      password: validTestUser.password
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response.headers).to.have.property('authorization');
      expect(response.headers.authorization).to.be.a('string');
      expect(response.headers.authorization).to.include('Bearer ');
      done();
    });
};