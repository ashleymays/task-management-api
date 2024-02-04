import { chai } from '../setup';

/**
 * Should return Invalid Credentials error for no email given.
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
      done();
    });
};