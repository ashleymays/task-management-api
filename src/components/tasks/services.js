/** @typedef { import("@prisma/client").task } Task */

import { prisma } from 'api/shared/database';

/**
 * The fields that are selected while querying the database.
 * Extracted for reusability.
 */
const select = {
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
 * @param {Task} taskData
 * @returns {Task}
 */
const getEditableFields = (taskData) => {
  const {
    id = null,
    creationDate = null,
    modificationDate = null,
    userId = null,
    project = null,
    taskStatus = null,
    ...data
  } = taskData;
  return data;
};

/**
 * @param {string} userId
 * @param {string} projectId
 * @param {Task} data
 * @returns {Promise<Task>}
 */
export const createTask = (userId, projectId, taskData) => {
  const data = getEditableFields(taskData);
  return prisma.task.create({
    select,
    data: {
      userId,
      projectId,
      ...data
    }
  });
};

/**
 * @param {string} taskId
 * @param {string} userId
 * @returns {Promise<Task>}
 */
export const findTaskById = (taskId, userId) => {
  return prisma.task.findUniqueOrThrow({
    select,
    where: {
      id: taskId,
      userId
    }
  });
};

/**
 * @param {string} userId
 * @param {string} projectId
 * @returns {Promise<Task>}
 */
export const findTasks = (userId, projectId) => {
  const where = { userId };

  if (projectId) {
    where.projectId = projectId;
  }

  return prisma.task.findMany({
    select,
    where,
    orderBy: [{ projectId: 'asc' }, { modificationDate: 'desc' }]
  });
};

/**
 * @param {string} taskId
 * @param {string} userId
 * @param {Task} taskData
 * @returns {Promise<Task>}
 */
export const updateTaskById = (taskId, userId, taskData) => {
  const data = getEditableFields(taskData);
  return prisma.task.update({
    select,
    where: {
      id: taskId,
      userId
    },
    data: {
      id: taskId,
      userId,
      ...data
    }
  });
};

/**
 * @param {string} taskId
 * @param {string} userId
 * @returns {Promise<void>}
 */
export const deleteTaskById = (taskId, userId) => {
  return prisma.task.delete({
    where: {
      id: taskId,
      userId
    }
  });
};
