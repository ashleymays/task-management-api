import { prisma } from 'api/shared/database';

export const getUserById = (id) => {
  return prisma.user.findOne({
    select: {
      email: true,
      firstName: true,
      lastName: true
    },
    where: { id }
  });
};
