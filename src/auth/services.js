import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../database';

/**
 * Gets the user from the database by
 * the provided email address.
 *
 * @example
 * const user = await getUserByEmail('example@gmail.com');
 *
 * @param { string } email
 * @returns { Promise<Prisma.user> }
 */
export const getUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

/**
 * Creates a JWT for authorizing requests.
 *
 * @example
 * const user = await getUserByEmail('example@gmail.com');
 * const token = await createUserToken(user.id);
 *
 * @param { string } userId
 * @returns { Promise<string> }
 */
export const createUserToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  });
};

/**
 * Returns true if the given password and the
 * password from the database match.
 *
 * @example
 * const { hashedPassword, ...rest } = await getUserByEmail('example@gmail.com');
 * const inputtedPassword = 'password';
 * const isMatch = await isCorrectPassword(inputtedPassword, hashedPassword);
 *
 * @param { string } inputtedPassword
 * @param { string } hashedPassword
 * @returns { Promise<boolean> }
 */
export const isCorrectPassword = (inputtedPassword, hashedPassword) => {
  return bcrypt.compare(inputtedPassword, hashedPassword);
};

/**
 * Gets the user without the sensitive or
 * unused information.
 *
 * @example
 * const user = await getUserByEmail('example@gmail.com');
 * const formattedUser = getFormattedUser(user);
 *
 * @param { Prisma.user } user
 * @returns { Prisma.user }
 */
export const getFormattedUser = (user) => {
  const { password, id, modificationDate, ...formattedUser } = user;
  return formattedUser;
};
