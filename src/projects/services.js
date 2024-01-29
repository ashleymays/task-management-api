import { prisma } from '../database';

export const get = (id) => {
  return prisma.project.findUnique({
    where: { id: String(id) }
  });
};

export const add = (userId, data) => {
  return prisma.project.create({
    where: { userId: String(userId) },
    data
  });
};

export const getList = (userId) => {
  return prisma.project.findMany({
    where: { userId: String(userId) }
  });
};

export const update = (id, data) => {
  return prisma.project.update({
    where: { id: String(id) },
    data
  });
};

export const remove = (id) => {
  return prisma.project.delete({
    where: { id: String(id) }
  });
};
