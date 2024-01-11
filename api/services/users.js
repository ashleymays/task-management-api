const bcrypt = require('bcrypt');
const { prisma } = require('../database');

const getUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
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
  getUserByEmail,
  addUser
};
