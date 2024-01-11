const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { prisma } = require('../database');

const createUserToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '15m' });
};

const addUser = async ({ password, ...rest }) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword
    }
  });
};

module.exports = {
  createUserToken,
  addUser
};
