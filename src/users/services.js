import { prisma } from 'api/shared/database';

/**
 *
 * @param {string} id
 * @returns {Promise<Prisma.user>}
 */
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

/**
 *
 * @param {string} id
 * @param {Prisma.user} data
 * @returns {Promise<Prisma.user>}
 */
export const updateUserById = (id, data) => {
  return prisma.user.update({
    select: {
      email: true,
      firstName: true,
      lastName: true
    },
    where: {
      id
    },
    data
  });
};

/**
 *
 * @param {string} id
 * @returns {Promise<void>}
 */
export const removeUserById = (id) => {
  return prisma.user.delete({
    select: {
      email: true,
      firstName: true,
      lastName: true
    },
    where: {
      id
    }
  });
};
