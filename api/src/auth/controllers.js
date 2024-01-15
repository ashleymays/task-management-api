import { catchAsyncErrors } from '#shared/utils.js';
import { STATUS_CODES } from '#shared/constants.js';
import { addUser } from './services.js';
import { getCookieParams } from './helpers.js';

export const login = () => {}

export const logout = catchAsyncErrors(async (req, res) => {
  res.removeHeader('Authorization').sendStatus(STATUS_CODES.NO_CONTENT);
});

export const register = catchAsyncErrors(async (req, res) => {
  const user = await addUser(req.body);
  const { name, token, options } = await getCookieParams(user.id);
  res.cookie(name, token, options).sendStatus(STATUS_CODES.CREATED);
});