import { chai, expect } from 'api/test/setup';
import { STATUS_CODES } from 'api/shared/constants';
import { app } from 'api/index';

/**
 * Should send No Content status.
 *
 * @param { function } done - required for chai-http
 */
export const sendNoContentStatus = (done) => {
  chai
    .request(app)
    .delete('/auth/logout')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.NO_CONTENT);
      done();
    });
};

/**
 * Should send no body in the response.
 *
 * @param { function } done - required for chai-http
 */
export const sendNoBodyInResponse = (done) => {
  chai
    .request(app)
    .delete('/auth/logout')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.not.have.property('_body');
      done();
    });
};

/**
 * Should remove the authorization header from the response.
 *
 * @param { function } done - required for chai-http
 */
export const removeAuthHeaderInResponse = (done) => {
  chai
    .request(app)
    .delete('/auth/logout')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response.headers).to.not.have.property('authorization');
      done();
    });
};
