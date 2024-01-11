const bcrypt = require('bcrypt');
const services = require('../services/users');
const { STATUS_CODES } = require('../constants');
const { 
  catchAsyncErrors, 
  createUserToken, 
  getUserCookieOptions 
} = require('../utils');

const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await services.getUserByEmail(email);
  if (!user) {
    next(Error('Invalid email and/or password.'));
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    next(Error('Invalid email and/or password.'));
  }

  res.sendStatus(STATUS_CODES.OK);
});

const logout = catchAsyncErrors(async (req, res) => {});

const registerUser = catchAsyncErrors(async (req, res) => {
  await services.addUser(req.body);
  const token = await createUserToken(15);
  const cookie = getUserCookieOptions();
  res
    .cookie(cookie.name, token, cookie.options)
    .sendStatus(STATUS_CODES.CREATED);
});

module.exports = {
  login,
  logout,
  registerUser
}