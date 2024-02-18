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
 * Removes data from a given user that should not be updated by the client.
 *
 * @param {Prisma.user} userData
 * @returns {Prisma.user}
 */
const removeReadonlyFields = (userData) => {
  const {
    id = null,
    creationDate = null,
    modificationDate = null,
    ...data
  } = userData;
  return data;
};

/**
 *
 * @param {string} userId
 * @param {Prisma.user} userData
 * @returns {Promise<Prisma.user>}
 */
export const updateUserById = (userId, userData) => {
  const data = removeReadonlyFields(userData);
  return prisma.user.update({
    select: {
      email: true,
      firstName: true,
      lastName: true
    },
    where: {
      id: userId
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
