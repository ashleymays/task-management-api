import { prisma } from '../shared/database';

export const getProjectById = (id) => {
  return prisma.project.findUnique({
    where: { id: String(id) }
  });
};

export const createProject = (userId, projectFields) => {
  return prisma.project.create({
    data: {
      ...projectFields,
      userId
    }
  });
};

export const getAllProjects = (userId) => {
  return prisma.project.findMany({
    where: { userId: String(userId) }
  });
};

export const updateProjectById = (id, projectFields) => {
  return prisma.project.update({
    where: { id: String(id) },
    data: { ...projectFields }
  });
};

export const removeProjectById = (id) => {
  return prisma.project.delete({
    where: { id: String(id) }
  });
};
