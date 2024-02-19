import { prisma } from 'api/shared/database';

/**
 * Removes data from a given task that should not be updated by the client.
 *
 * @param {Prisma.task} taskData
 * @returns {Prisma.task}
 */
const removeReadonlyFields = (taskData) => {
  const {
    id = null,
    creationDate = null,
    modificationDate = null,
    userId = null,
    ...data
  } = taskData;
  return data;
};

/**
 *
 * @param {string} userId
 * @param {Prisma.task} taskData
 * @returns {Promise<Prisma.task>}
 */
export const createTask = (userId, taskData) => {
  const data = removeReadonlyFields(taskData);
  return prisma.task.create({
    data: {
      userId,
      ...data
    }
  });
};
