import { Sequelize } from 'sequelize';

export const db = new Sequelize(process.env.DATABASE_URL);
