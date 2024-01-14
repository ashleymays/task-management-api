import { prisma } from '#database';

export const getUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};