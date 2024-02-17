import { authRouter } from 'api/authentication';
import { userRouter } from 'api/users';
import { projectRouter } from 'api/projects';
import { verifyUser } from 'api/middleware/verify-user';

export const attachRoutes = (app) => {
  attachPublicRoutes(app);
  attachProtectedRoutes(app);
};

const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};

const attachProtectedRoutes = (app) => {
  app.use(verifyUser);
  app.use('/users', userRouter);
  app.use('/projects', projectRouter);
};
