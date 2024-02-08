import { prisma } from 'api/shared/database';

export const getUserById = (id) => {
  return prisma.user.findUnique({
    select: {
      email: true,
      firstName: true,
      lastName: true
    },
    where: { id }
  });
};
