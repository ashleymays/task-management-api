import { prisma } from 'api/shared/database';

const selectFields = {
  name: true,
  description: true,
  creationDate: true,
  modificationDate: true,
  id: true
};

/**
 * Removes data from a given project that should not be updated by the client.
 *
 * @param {Prisma.project} projectData
 * @returns {Prisma.project}
 */
const removeReadonlyFields = (projectData) => {
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
 *
 * @param {string} userId
 * @param {Prisma.project} projectData
 * @returns {Promise<Prisma.project>}
 */
export const createProject = (userId, projectData) => {
  const data = removeReadonlyFields(projectData);
  return prisma.project.create({
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
 * @param {string} userId
 * @returns {Promise<Prisma.project>}
 */
export const findProjects = (userId) => {
  return prisma.project.findMany({
    select: {
      ...selectFields
    },
    where: {
      userId
    },
    orderBy: {
      modificationDate: 'desc'
    }
  });
};

/**
 *
 * @param {string} projectId
 * @param {string} userId
 * @returns {Promise<Prisma.project>}
 */
export const findProjectById = (projectId, userId) => {
  return prisma.project.findUnique({
    select: {
      ...selectFields
    },
    where: {
      id: projectId,
      userId
    }
  });
};

/**
 *
 * @param {string} projectId
 * @param {string} userId
 * @param {Prisma.project} projectData
 * @returns {Promise<Prisma.project>}
 */
export const updateProjectById = (projectId, userId, projectData) => {
  const data = removeReadonlyFields(projectData);
  return prisma.project.update({
    select: {
      ...selectFields
    },
    where: {
      id: projectId,
      userId
    },
    data
  });
};

/**
 *
 * @param {string} projectId
 * @param {string} userId
 * @returns {Promise<void>}
 */
export const removeProjectById = (projectId, userId) => {
  return prisma.project.delete({
    where: {
      id: projectId,
      userId
    }
  });
};
