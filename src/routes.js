import {
  authRouter,
  userRouter,
  projectRouter,
  taskRouter
} from './components';
import { checkUserAuthorization } from 'api/middleware/check-user-auth';

export const attachRoutes = (app) => {
  attachPublicRoutes(app);
  attachProtectedRoutes(app);
};

const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};

const attachProtectedRoutes = (app) => {
  app.use(checkUserAuthorization);
  app.use('/users', userRouter);
  app.use('/projects', projectRouter);
  app.use('/tasks', taskRouter);
};
