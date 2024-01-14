const { STATUS_CODES } = require('../constants');
const { catchAsyncErrors } = require('../utils');
const { addUser, createUserToken } = require('../services/auth');

const login = () => {};

const logout = () => {};

const register = catchAsyncErrors(async (req, res) => {
  const user = await addUser(req.body);
  const cookieParams = await getAuthorizationParams(user.id);
  res.cookie(cookieParams).sendStatus(STATUS_CODES.CREATED);
});

/**
* Returns the parameters needed 
* for the authorization cookie.
* @param { string } userId 
* @returns { object }
*/
const getAuthorizationParams = async (userId) => {
  const MILLISECONDS_IN_MINUTE = 60 * 1000;
  const token = await createUserToken(userId);
  return {
      name: '__main',
      token,
      options: {
          httpOnly: true,
          secure: true,
          maxAge: 2 * MILLISECONDS_IN_MINUTE
      }
  }
}

module.exports = {
  login,
  logout,
  register
};
