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
 * const token = await createUserToken(userId);
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
 * @param { Object } user
 * @param { string } user.password
 * @param { string } user.email
 * @param { string } user.firstName
 * @param { string } user.lastName
 * @returns { Promise<Prisma.user> }
 */
export const findOrCreateUser = (() => {
  const getHashedPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  };

  return async ({ password, email, ...rest }) => {
    const hashedPassword = await getHashedPassword(password);
    return prisma.user.upsert({
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
