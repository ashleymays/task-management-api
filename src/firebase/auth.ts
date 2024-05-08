import { auth } from '~/firebase/config';

export const getFirebaseUserId = async (idToken: string) => {
  const decodedToken = await auth.verifyIdToken(idToken);
  return decodedToken.uid;
};
