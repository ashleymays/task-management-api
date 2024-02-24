/** @typedef { import("@prisma/client").project } Project */

import { prisma } from 'api/shared/database';

/**
 * The fields that are selected while querying the database.
 * Extracted for reusability.
 */
const select = {
  name: true,
  description: true,
  creationDate: true,
  modificationDate: true,
  id: true
};

/**
 * Returns only the project data that the client is allowed to update.
 * It does not mutate the original object.
 * Used for creating and updating a project.
 *
 * @param {Project} projectData
 * @returns {Project}
 */
const getEditableFields = (projectData) => {
  const {
    id = null,
    creationDate = null,
    modificationDate = null,
    userId = null,
    ...data
  } = projectData;
  return data;
};

/**
 * @param {string} userId
 * @returns {Promise<Project>}
 */
export const findProjects = (userId) => {
  return prisma.project.findMany({
    select,
    where: {
      userId
    },
    orderBy: {
      modificationDate: 'desc'
    }
  });
};

/**
 * @param {string} userId
 * @param {Project} projectData
 * @returns {Promise<Project>}
 */
export const createProject = (userId, projectData) => {
  const data = getEditableFields(projectData);
  return prisma.project.create({
    select,
    data: {
      userId,
      ...data
    }
  });
};

/**
 * @param {string} projectId
 * @param {string} userId
 * @returns {Promise<Project>}
 */
export const findProjectById = (projectId, userId) => {
  return prisma.project.findUniqueOrThrow({
    select,
    where: {
      id: projectId,
      userId
    }
  });
};

/**
 * @param {string} projectId
 * @param {string} userId
 * @param {Project} projectData
 * @returns {Promise<Project>}
 */
export const updateProjectById = (projectId, userId, projectData) => {
  const data = getEditableFields(projectData);
  return prisma.project.update({
    select,
    where: {
      id: projectId,
      userId
    },
    data
  });
};

/**
 * @param {string} projectId
 * @param {string} userId
 * @returns {Promise<void>}
 */
export const deleteProjectById = (projectId, userId) => {
  return prisma.project.delete({
    where: {
      id: projectId,
      userId
    }
  });
};
