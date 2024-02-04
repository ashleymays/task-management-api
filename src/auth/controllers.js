import { STATUS_CODES } from '../constants';
import { NotFoundError, InvalidCredentialsError } from '../errors';
import { catchErrors } from '../utils';
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

  const formattedUser = services.getFormattedUser(user);
  const token = await services.createUserToken(user.id);

  res
    .set('Authorization', `Bearer ${token}`)
    .status(STATUS_CODES.OK)
    .json(formattedUser);
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
  const formattedUser = services.getFormattedUser(user);
  const token = await services.createUserToken(user.id);

  res
    .set('Authorization', `Bearer ${token}`)
    .status(STATUS_CODES.CREATED)
    .json(formattedUser);
});

export const logout = catchErrors(async (req, res) => {
  res.removeHeader('Authorization');
  res.sendStatus(STATUS_CODES.NO_CONTENT);
});
