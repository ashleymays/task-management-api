import { PrismaClient } from '@prisma/client';

if (process.env.NODE_ENV !== 'production') {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
}

export const prisma = global.__db__ || new PrismaClient();
