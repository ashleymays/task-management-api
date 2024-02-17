import { prisma } from 'api/shared/database';

/**
 *
 * @param {string} id
 * @returns {Promise<Prisma.user>}
 */
export const findUserById = (id) => {
  return prisma.user.findUnique({
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

/**
 *
 * @param {string} id
 * @param {Prisma.user} userData
 * @returns {Promise<Prisma.user>}
 */
export const updateUserById = (id, userData) => {
  const {
    id = null,
    creationDate = null,
    modificationDate = null,
    ...data
  } = userData;
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
