import * as services from './services';

export const attachUserToRequest = (req, user) => {
  req.user = { userId: user.id };
};

export const createCookie = async (userId) => {
  const MILLISECONDS_IN_MINUTE = 60 * 1000;
  const token = await services.createToken(userId);

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
