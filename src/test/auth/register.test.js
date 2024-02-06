import { chai, expect } from 'api/test/setup';
import { STATUS_CODES } from 'api/constants';
import { app } from 'api/index';

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
