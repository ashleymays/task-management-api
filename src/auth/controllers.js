import { STATUS_CODES } from '../constants';
import { NotFoundError, InvalidCredentialsError } from '../custom-errors';
import { catchErrors } from '../utils';
import * as services from './services';
import * as helpers from './helpers';

export const login = catchErrors(async (req, res) => {
  const { email, password } = req.body;
  const user = await services.getUserByEmail(email);

  if (!user) {
    res.status(STATUS_CODES.NOT_FOUND).json(new NotFoundError());
  }

  const isCorrectPassword = await services.isCorrectPassword(
    password,
    user.password
  );

  if (!isCorrectPassword) {
    res.status(STATUS_CODES.BAD_REQUEST).json(new InvalidCredentialsError());
  }

  helpers.attachUserToRequest(req, user);

  const { name, token, options } = await helpers.createCookie(user.id);
  res.cookie(name, token, options).status(STATUS_CODES.OK).json();
});