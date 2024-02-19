import { prisma } from 'api/shared/database';

const selectFields = {
  name: true,
  description: true,
  startDate: true,
  estCompletionDate: true,
  actualCompletionDate: true,
  isDelayed: true,
  creationDate: true,
  modificationDate: true,
  id: true,
  project: {
    select: {
      id: true,
      name: true
    }
  },
  taskStatus: {
    select: {
      id: true,
      definition: true
    }
  }
};

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
    select: {
      ...selectFields
    },
    data: {
      userId,
      ...data
    }
  });
};

/**
 *
 * @param {string} taskId
 * @param {string} userId
 * @returns {Promise<Prisma.task>}
 */
export const findTaskById = (taskId, userId) => {
  return prisma.task.findUnique({
    select: {
      ...selectFields
    },
    where: {
      id: taskId,
      userId
    }
  });
};
