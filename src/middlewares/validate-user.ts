import { catchErrors } from '@ashleymays/nodejs-utils';
import { getFirebaseUserId } from '~/firebase/auth';

export const validateUser = catchErrors(async (req, res, next) => {
  const encodedToken = req.headers.authorization;
  const firebaseUserId = await getFirebaseUserId(encodedToken);

  req.user = { id: firebaseUserId };

  next();
});
