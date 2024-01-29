import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../database';

export const createToken = (userId) => {
  return jwt.sign({ userId: String(userId) }, process.env.SECRET_KEY, {
    expiresIn: '5s'
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
