import * as baseChai from 'chai';
import chaiHttp from 'chai-http';

const chai = baseChai.use(chaiHttp);

export const request = chai.request;

export const expect = chai.expect;

export const testUser = {
  email: 'test-email@email.com',
  password: 'test-password',
  firstName: 'test-firstName',
  lastName: 'test-lastName'
};
