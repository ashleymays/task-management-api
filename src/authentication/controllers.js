import { NotFoundError, InvalidCredentialsError } from 'api/shared/errors';
import { STATUS_CODES } from 'api/shared/constants';
import { catchErrors } from 'api/shared/utils';
import * as services from './services';

export const login = catchErrors(async (req, res) => {
  const { email = null, password = null } = req.body;

  if (!email || !password) {
    throw new InvalidCredentialsError();
  }

  const user = await services.findUserByEmail(email);
  if (!user) {
    throw new NotFoundError();
  }

  const isMatch = await services.isCorrectPassword(password, user.password);
  if (!isMatch) {
    throw new InvalidCredentialsError();
  }

  const token = await services.createUserToken(user.id);
  const userWithoutSensitiveData = services.getUserWithoutSensitiveData(user);

  res
    .set('Authorization', `Bearer ${token}`)
    .status(STATUS_CODES.OK)
    .json(userWithoutSensitiveData);
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
    .status(STATUS_CODES.CREATED)
    .json(user);
});

export const logout = catchErrors(async (req, res) => {
  req.user = {};
  res.sendStatus(STATUS_CODES.NO_CONTENT);
});
