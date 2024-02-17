import { prisma } from 'api/shared/database';

/**
 *
 * @param {string} userId
 * @param {Prisma.project} data
 * @returns {Promise<Prisma.project>}
 */
export const createProject = (userId, projectData) => {
  return prisma.project.create({
    select: {
      name: true,
      description: true,
      creationDate: true,
      modificationDate: true,
      id: true
    },
    data: {
      userId,
      ...projectData
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
      name: true,
      description: true,
      creationDate: true,
      modificationDate: true,
      id: true
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
      name: true,
      description: true,
      creationDate: true,
      modificationDate: true,
      id: true
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
  // We don't want to allow updating these dates manually,
  // so we have to filter them out of the data.
  const { creationDate = null, modificationDate = null, ...data } = projectData;

  return prisma.project.update({
    select: {
      name: true,
      description: true,
      creationDate: true,
      modificationDate: true,
      id: true
    },
    where: {
      id: projectId,
      userId
    },
    update: {
      ...data
    }
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
