import { STATUS_CODES } from '../constants';
import { NotFoundError, InvalidCredentialsError } from '../custom-errors';
import { catchErrors } from '../utils';
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
