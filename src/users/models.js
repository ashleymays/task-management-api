import { DataTypes } from 'sequelize';
import { sequelize } from '#src/database';

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.TEXT,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      unique: true    },
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    creationDate: DataTypes.DATE,
    modificationDate: DataTypes.DATE
  },
  {
    tableName: 'registered_user',
    createdAt: 'creation_date',
    updatedAt: 'modification_date',
    underscored: true
  }
);