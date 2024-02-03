import { STATUS_CODES } from '../shared/constants';
import { NotFoundError, InvalidCredentialsError } from '../shared/errors';
import { catchErrors } from '../shared/utils';
import * as services from './services';

const attachUserToRequest = (req, user) => {
  req.user = { userId: user.id };
};

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

  attachUserToRequest(req, user);

  const formattedUser = services.getFormattedUser(user);
  const token = await services.createToken(user.id);

  res
    .set('Authorization', `Bearer ${token}`)
    .status(STATUS_CODES.OK)
    .json(formattedUser);
});

export const register = catchErrors(async (req, res) => {
  // get email, password, firstName, and lastName from request body
  // if email is already in database, login as normally (set up auth header and attach user to request)
  // else add user to database
  // get formatted user object
  // get token for user
  // send response
});
