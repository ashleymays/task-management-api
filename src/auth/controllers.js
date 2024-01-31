import { STATUS_CODES } from '../shared/constants';
import {
  NotFoundError,
  InvalidCredentialsError
} from '../shared/custom-errors';
import { catchErrors } from '../shared/utils';
import { getUserByEmail, isCorrectPassword, createToken } from './services';

export const login = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    throw new NotFoundError();
  }

  const isMatch = await isCorrectPassword(password, user.password);
  if (!isMatch) {
    throw new InvalidCredentialsError();
  }

  req.user = { userId: user.id };

  const token = await createToken(user.id);
  res.set('Authorization', `Bearer ${token}`).sendStatus(STATUS_CODES.OK);
});

export const register = catchErrors(async (req, res) => {
  // check if user exists in database
  // if not, create a new user
  // if so, check if password matches
  // if it doesn't match, throw invalid credentials errors
  // create user token
  // set up auth header and send ok status
});
