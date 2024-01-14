import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '#database';

/**
 * Returns a new JWT.
 * @param { string } userId 
 * @returns { Promise<string> }
 */
export const createUserToken = (userId) => {
  return jwt.sign(
      { userId },
      process.env.SECRET_KEY,
      { expiresIn: '15m' }
  );
}

/**
* Adds a new user to the database.
* @param { object } userCredentials
* @returns { Promise<object> }
*/
export const addUser = async ({ password, ...rest }) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return prisma.user.create({
      data: {
          ...rest,
          password: hashedPassword
      }
  })
}