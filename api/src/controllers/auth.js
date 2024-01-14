import { catchAsyncErrors } from '#utils';
import { addUser } from '#services/auth';
import { getCookieParams } from '#helpers/auth';
import { STATUS_CODES } from '#constants';

export const login = () => {};

export const logout = () => {};

export const register = catchAsyncErrors(async (req, res) => {
  const user = await addUser(req.body);
  const { name, token, options } = await getCookieParams(user.id);
  res.cookie(name, token, options).sendStatus(STATUS_CODES.CREATED);
});
