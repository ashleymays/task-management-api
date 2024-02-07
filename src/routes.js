import { authRouter } from 'api/authentication';
import { userRouter } from 'api/users';
import { verifyUser } from 'api/middleware/verify-user';

export const attachRoutes = (app) => {
  attachPublicRoutes(app);
  attachPrivateRoutes(app);
};

const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};

const attachPrivateRoutes = (app) => {
  app.use(verifyUser);
  app.use('/users', userRouter);
};
