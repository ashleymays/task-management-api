import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../shared/database';

export const createToken = (userId) => {
  return jwt.sign({ userId: String(userId) }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  });
};

export const isCorrectPassword = (inputtedPassword, hashedPassword) => {
  return bcrypt.compare(inputtedPassword, hashedPassword);
};

export const getUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email: String(email) }
  });
};

export const getFormattedUser = (user) => {
  const { password, id, modificationDate, ...formattedUser } = user;
  return formattedUser;
};
