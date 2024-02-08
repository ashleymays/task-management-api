import { request, expect } from 'api/test/setup';
import { STATUS_CODES } from 'api/shared/constants';
import { app } from 'api/index';

export const invalidCredentialsErrorForMissingCredentials = (done) => {
  request(app)
    .post('/auth/register')
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
