import * as baseChai from 'chai';
import chaiHttp from 'chai-http';
import { STATUS_CODES } from '../../constants.js';
import { app } from '../../index.js';

const chai = baseChai.use(chaiHttp);

export const noEmail = (done) => {
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

export const noPassword = (done) => {
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

export const wrongEmail = (done) => {
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

export const wrongPassword = (done) => {
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
      chai.expect(response._body).to.have.property('email');
      done();
    });
};
