import { request, expect } from 'api/test/setup';
import { STATUS_CODES } from 'api/shared/constants';
import { app } from 'api/index';

export const sendNoContentStatus = (done) => {
  request(app)
    .delete('/auth/logout')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(STATUS_CODES.NO_CONTENT);
      done();
    });
};

export const sendNoBodyInResponse = (done) => {
  request(app)
    .delete('/auth/logout')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.not.have.property('_body');
      done();
    });
};

export const removeAuthHeaderInResponse = (done) => {
  request(app)
    .delete('/auth/logout')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response.headers).to.not.have.property('authorization');
      done();
    });
};
