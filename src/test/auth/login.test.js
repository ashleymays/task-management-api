import { chai, expect } from 'api/test/setup';
import { STATUS_CODES } from 'api/constants';
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
 * Should return the user's information in an object for correct credentials given.
 *
 * @param { function } done - required for chai-http
 */
export const objectForCorrectCredentials = (done) => {
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
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('email', validTestUser.email);
      expect(response._body).to.have.property(
        'firstName',
        validTestUser.firstName
      );
      expect(response._body).to.have.property(
        'lastName',
        validTestUser.lastName
      );
      expect(response._body).to.not.have.property('password');
      expect(response._body).to.not.have.property('id');
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

/**
 * Should return well-formed json for correct credentials given.
 *
 * @param { function } done - required for chai-http
 */
export const jsonForCorrectCredentials = (done) => {
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
      expect(response).to.be.json;
      done();
    });
};

/**
 * Should return well-formed json for incorrect or missing credentials given.
 *
 * @param { function } done - required for chai-http
 */
export const jsonForIncorrectCredentials = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({})
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.be.json;
      done();
    });
};
