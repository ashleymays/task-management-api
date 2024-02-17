import { authRouter } from 'api/components/authentication';
import { userRouter } from 'api/components/users';
import { projectRouter } from 'api/components/projects';
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
