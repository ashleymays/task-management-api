import { STATUS_CODES } from 'api/constants';
import { NotFoundError, InvalidCredentialsError } from 'api/errors';
import { catchErrors } from 'api/utils';
import * as services from './services';

export const login = catchErrors(async (req, res) => {
  const { email = null, password = null } = req.body;

  if (!email || !password) {
    throw new InvalidCredentialsError();
  }

  const user = await services.getUserByEmail(email);
  if (!user) {
    throw new NotFoundError();
  }

  const isMatch = await services.isCorrectPassword(password, user.password);
  if (!isMatch) {
    throw new InvalidCredentialsError();
  }

  const token = await services.createUserToken(user.id);

  res
    .set('Authorization', `Bearer ${token}`)
    .sendStatus(STATUS_CODES.OK);
});

export const register = catchErrors(async (req, res) => {
  const {
    email = null,
    password = null,
    firstName = null,
    lastName = null
  } = req.body;

  if (!email || !password || !firstName || !lastName) {
    throw new InvalidCredentialsError();
  }

  const user = await services.findOrCreateUser(req.body);
  const token = await services.createUserToken(user.id);

  res
    .set('Authorization', `Bearer ${token}`)
    .sendStatus(STATUS_CODES.CREATED);
});

export const logout = catchErrors(async (req, res) => {
  res.removeHeader('Authorization');
  res.sendStatus(STATUS_CODES.NO_CONTENT);
});
