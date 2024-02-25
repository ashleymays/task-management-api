/** @typedef { import("@prisma/client").user } User */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { InvalidInputException } from 'api/shared/errors';
import { prisma } from 'api/shared/database';

/**
 * @async
 * @param {User} credentials
 * @returns {Promise<User>}
 */
export const findUser = async ({ email = '', password = '' }) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { email } });
  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new InvalidInputException('Password is incorrect.');
  }

  return user;
};

/**
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = (password) => {
  const SALT_ROUNDS = 10;
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Returns only the user data that the client is allowed to update.
 * It does not mutate the original object.
 *
 * @param {User} user
 * @returns {User}
 */
const getEditableFields = (user) => {
  const {
    id = null,
    creationDate = null,
    modificationDate = null,
    password = null,
    ...data
  } = user;
  return data;
};

/**
 * @async
 * @param {User} credentials
 * @returns {Promise<User>}
 */
export const findOrCreateUser = async (credentials) => {
  const hashedPassword = await hashPassword(credentials.password);
  const { email = '', ...rest } = getEditableFields(credentials);

  const now = Date.now();

  const user = await prisma.user.upsert({
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

  const isUserNew = user.creationDate >= now;

  if (isUserNew) {
    return user;
  }

  if (credentials.password) {
    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (isCorrectPassword) {
      return user;
    }
  }

  throw new InvalidInputException('Password is invalid.');
};

/**
 * Returns the user without the sensitive information
 * that should not be exposed to the client.
 *
 * @param {User} user
 * @returns {User}
 */
export const getUserWithoutSensitiveData = (user) => {
  const {
    id = null,
    password = null,
    modificationDate = null,
    ...userWithoutSensitiveData
  } = user;
  return userWithoutSensitiveData;
};

/**
 * Creates a JWT for authorizing requests.
 *
 * @example
 * const token = await createUserToken('example');
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

  // The method "jwt.sign" is callback-based. We wrap it in a promise
  // so that we can use the async/await pattern when we call this function.
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_KEY, (error, token) =>
      error === null ? resolve(token) : reject(error)
    );
  });
};
