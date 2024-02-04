import * as baseChai from 'chai';
import chaiHttp from 'chai-http';
import { STATUS_CODES } from '../../constants';
import { app } from '../../index';

const chai = baseChai.use(chaiHttp);

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
      chai.expect(error).to.be.null;
      chai.expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
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
      email: 'email@email.com'
    })
    .end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
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
      password: 'password123'
    })
    .end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response).to.have.status(STATUS_CODES.NOT_FOUND);
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
      email: 'email@email.com',
      password: 'wrong-password'
    })
    .end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
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
      email: 'email@email.com',
      password: 'password123'
    })
    .end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response).to.have.status(STATUS_CODES.OK);
      done();
    });
};

/**
 * Should return the user's information in an object for correct credentials given.
 *
 * @param { function } done - required for chai-http
 */
export const returnObjectForCorrectCredentials = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'email@email.com',
      password: 'password123'
    })
    .end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response._body).to.be.an('object');
      chai.expect(response._body).to.have.property('email');
      done();
    });
};

/**
 * Should return an authorization header for correct credentials given.
 *
 * @param { function } done - required for chai-http
 */
export const returnAuthHeaderForCorrectCredentials = (done) => {
  chai
    .request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'email@email.com',
      password: 'password123'
    })
    .end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response.headers.authorization).to.be.a('string');
      chai.expect(response.headers.authorization).to.include('Bearer ');
      chai.expect(response._body).to.have.property('email');
      done();
    });
};
