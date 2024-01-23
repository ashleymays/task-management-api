import { Sequelize } from 'sequelize';

if (process.env.NODE_ENV !== 'production') {
  if (!global.__db__) {
    global.__db__ = new Sequelize(process.env.DATABASE_URL);
  }
}

export const sequelize = global.__db__ || new Sequelize(process.env.DATABASE_URL);