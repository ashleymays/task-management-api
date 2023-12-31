const { PrismaClient } = require("@prisma/client");

if (!global._database_client) {
  global._database_client = new PrismaClient();
}

const prisma = global._database_client;

module.exports = prisma;
