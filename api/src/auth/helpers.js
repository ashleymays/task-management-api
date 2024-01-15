import { createUserToken } from '#services/auth';

/**
 * Returns the parameters needed
 * for the authorization cookie.
 * @param { string } userId
 * @returns { object }
 */
export const getCookieParams = async (userId) => {
  const MILLISECONDS_IN_MINUTE = 60 * 1000;
  const token = await createUserToken(userId);
  return {
    name: '__main__',
    token,
    options: {
      httpOnly: true,
      secure: true,
      maxAge: 2 * MILLISECONDS_IN_MINUTE
    }
  };
};
