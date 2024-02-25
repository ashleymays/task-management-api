import { StatusCodes } from 'http-status-codes';
import { request, expect, testUser } from 'api/test/setup';
import { app } from 'api/index';

export const invalidInputExceptionForMissingCredentials = (done) => {
  request(app)
    .post('/auth/register')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({})
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response._body).to.be.an('object');
      expect(response._body).to.have.property('name', 'InvalidInputException');
      done();
    });
};