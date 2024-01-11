const { STATUS_CODES } = require('../constants');
const { catchAsyncErrors, getAuthorizationCookie } = require('../utils');
const { addUser, createUserToken } = require('../services/auth');

const login = () => {};

const logout = () => {};

const registerUser = catchAsyncErrors(async (req, res) => {
  const user = await addUser(req.body);
  const token = await createUserToken(user.id);
  const { name, options } = getAuthorizationCookie();
  res.cookie(name, token, options).sendStatus(STATUS_CODES.CREATED);
});

module.exports = {
  login,
  logout,
  registerUser
};
