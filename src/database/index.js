const { PrismaClient } = require("@prisma/client");

if (process.env.NODE_ENV !== "production") {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
}

const prisma = global.__db__ || new PrismaClient();

module.exports = { prisma };
