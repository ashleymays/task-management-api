const { STATUS_CODES } = require('../constants');
const { catchAsyncErrors } = require('../utils');
const { addUser } = require('../services/auth');
const { getAuthorizationParams } = require('../helpers/auth');

const login = () => {};

const logout = () => {};

const register = catchAsyncErrors(async (req, res) => {
  const user = await addUser(req.body);
  const cookieParams = await getAuthorizationParams(user.id);
  res.cookie(cookieParams).sendStatus(STATUS_CODES.CREATED);
});

module.exports = {
  login,
  logout,
  register
};
