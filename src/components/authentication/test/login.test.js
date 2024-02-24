import { StatusCodes } from 'http-status-codes';
import { request, expect, testUser } from 'api/test/setup';
import { app } from 'api/index';

export const invalidCredentialsErrorForNoEmail = (done) => {
  request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({})
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

export const invalidCredentialsErrorForNoPassword = (done) => {
  request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: testUser.email
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

export const notFoundErrorForWrongEmail = (done) => {
  request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: 'wrong-email@nothing.com',
      password: testUser.password
    })
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.NOT_FOUND);
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('name', 'NotFoundError');
      done();
    });
};

export const notFoundErrorForWrongPassword = (done) => {
  request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email: testUser.email,
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
      expect(response).to.have.status(STATUS_CODES.OK);
      done();
    });
};

export const authHeaderForCorrectCredentials = (done) => {
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
      expect(response.headers).to.have.property('authorization');
      expect(response.headers.authorization).to.be.a('string');
      expect(response.headers.authorization).to.include('Bearer ');
      done();
    });
};

export const objectForCorrectCredentials = (done) => {
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
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('email', testUser.email);
      expect(response._body).to.have.property('firstName', testUser.firstName);
      expect(response._body).to.have.property('lastName', testUser.lastName);
      expect(response._body).to.not.have.property('password');
      expect(response._body).to.not.have.property('id');
      done();
    });
};

export const jsonForCorrectCredentials = (done) => {
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
      expect(response).to.be.json;
      done();
    });
};

export const jsonForIncorrectCredentials = (done) => {
  request(app)
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
