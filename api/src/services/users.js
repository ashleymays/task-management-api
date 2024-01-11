const { prisma } = require('../database');

const getUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

module.exports = { getUserByEmail };
