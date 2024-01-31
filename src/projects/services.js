import { prisma } from '../shared/database';

/**
 * Finds a project by its database ID.
 * @param { string } id
 * @returns { Promise<Prisma.project> }
 */
export const getProjectById = (id) => {
  return prisma.project.findUnique({
    where: { id }
  });
};

/**
 * Creates a new project in the database.
 * Project must be associated with a user.
 * @param { string } userId
 * @param { object } projectFields
 * @returns { Promise<Prisma.project> }
 */
export const createProject = (userId, projectFields) => {
  return prisma.project.create({
    data: {
      ...projectFields,
      userId
    }
  });
};

/**
 * Finds all projects associated with a user.
 * @param { string } userId
 * @returns { Promise<Array<Prisma.project>> }
 */
export const getAllProjects = (userId) => {
  return prisma.project.findMany({
    where: { userId }
  });
};

/**
 * Updates part or all of a project's fields.
 * Searches by project ID.
 * @param { string } id
 * @param { object } projectFields
 * @returns { Promise<Prisma.project> }
 */
export const updateProjectById = (id, projectFields) => {
  return prisma.project.update({
    where: { id },
    data: { ...projectFields }
  });
};

/**
 * Deletes a project in the database
 * identified by its ID.
 * @param { string } id
 * @returns { Promise<void> }
 */
export const removeProjectById = (id) => {
  return prisma.project.delete({
    where: { id }
  });
};
