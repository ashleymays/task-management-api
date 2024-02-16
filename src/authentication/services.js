import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from 'api/shared/database';

/**
 * Gets the user from the database by
 * the provided email address.
 *
 * @example
 * const user = await getUserByEmail('example@gmail.com');
 *
 * @param {string} email
 * @returns {Promise<Prisma.user>}
 */
export const getUserByEmail = (email) => {
  return prisma.user.findUnique({
    select: {
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      id: true
    },
    where: { email }
  });
};

/**
 * Creates a JWT for authorizing requests.
 *
 * @param {string} userId
 * @returns {Promise<string>}
 */
export const createUserToken = (userId) => {
  const now = Date.now();
  const MILLISECONDS_IN_HOUR = 1000 * 60 * 60;
  const payload = {
    iat: now,
    exp: now + MILLISECONDS_IN_HOUR,
    userId
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_KEY, (error, token) =>
      error === null ? resolve(token) : reject(error)
    );
  });
};

/**
 * Returns true if the given password and the
 * password from the database match.
 *
 * @example
 * const isMatch = await isCorrectPassword(inputtedPassword, hashedPassword);
 *
 * @param {string} inputtedPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export const isCorrectPassword = (inputtedPassword, hashedPassword) => {
  return bcrypt.compare(inputtedPassword, hashedPassword);
};

/**
 * Adds a new user to the database, or returns the user
 * if they already exist in the database.
 * 
 * @example
 * const user = await findOrCreateUser({
    email: 'example@gmail.com',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName'
   });
 *
 * @param {object} user
 * @param {string} user.password
 * @param {string} user.email
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @returns {Promise<Prisma.user>}
 */
export const findOrCreateUser = (() => {
  const getHashedPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  };

  return async ({ password, email, ...rest }) => {
    const hashedPassword = await getHashedPassword(password);
    return prisma.user.upsert({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        id: true
      },
      where: {
        email
      },
      update: {},
      create: {
        password: hashedPassword,
        email,
        ...rest
      }
    });
  };
})();

/**
 * Returns the user without the sensitive information
 * that should not be exposed to the client.
 *
 * @param {object} user
 * @returns {object}
 */
export const getUserWithoutSensitiveData = (user) => {
  const { id, password, ...userWithoutSensitiveData } = user;
  return userWithoutSensitiveData;
};
