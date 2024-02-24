/** @typedef { import("@prisma/client").user } User */

import { prisma } from 'api/shared/database';

/**
 * Returns only the user data that the client is allowed to update.
 * It does not mutate the original object.
 * Used for creating and updating a user.
 *
 * @param {User} userData
 * @returns {User}
 */
const getEditableFields = (userData) => {
  const {
    id = null,
    creationDate = null,
    modificationDate = null,
    password = null,
    ...data
  } = userData;
  return data;
};

/**
 * @param {string} id
 * @returns {Promise<User>}
 */
export const findUserById = (id) => {
  return prisma.user.findUniqueOrThrow({
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
 * @param {string} id
 * @param {User} userData
 * @returns {Promise<User>}
 */
export const updateUserById = (id, userData) => {
  const data = getEditableFields(userData);
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
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteUserById = (id) => {
  return prisma.user.delete({ where: { id } });
};
