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
