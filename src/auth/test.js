import { describe, it } from 'mocha';
import * as baseChai from 'chai';
import chaiHttp from 'chai-http';
import { STATUS_CODES } from '../shared/constants.js';

const chai = baseChai.use(chaiHttp);

const url = 'https://task-management-app-lhvev.run-us-west2.goorm.site';

describe('auth', () => {
  describe('login', () => {
    it('should return Invalid Credentials error for no email given', (done) => {
      chai
        .request(url)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({})
        .end((error, response) => {
          chai.expect(error).to.be.null;
          chai.expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
          done();
        });
    });

    it('should return Invalid Credentials error for no password given', (done) => {
      chai
        .request(url)
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
    });

    it('should return Not Found error for incorrect email given', (done) => {
      chai
        .request(url)
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
    });

    it('should return Invalid Credentials error for incorrect password given', (done) => {
      chai
        .request(url)
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
    });

    it('should return OK status for correct credentials given', (done) => {
      chai
        .request(url)
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
    });

    it("should return the user's information in an object for correct credentials given", (done) => {
      chai
        .request(url)
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
    });
  });
});
