import { chai, expect } from 'api/test/setup';
import { STATUS_CODES } from 'api/shared/constants';
import { app } from 'api/index';

const validTestUser = {
  email: 'test-email@email.com',
  password: 'test-password',
  firstName: 'test-firstName',
  lastName: 'test-lastName'
};

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
