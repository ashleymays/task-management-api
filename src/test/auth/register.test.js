import { chai } from '../setup';
import { STATUS_CODES } from '../../constants';
import { app } from '../../index';

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
    .send({})
    .end((error, response) => {
      chai.expect(error).to.be.null;
      chai.expect(response).to.have.status(STATUS_CODES.BAD_REQUEST);
      chai.expect(response._body).to.be.an('object');
      chai.expect(response._body).to.have.property('name');
      chai.expect(response._body.name).to.equal('InvalidCredentialsError');
      done();
    });
};
