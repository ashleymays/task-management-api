import { authRouter } from './auth';
import { projectRouter } from './projects';
import { verifyUser } from './shared/middleware';

export const attachRoutes = (app) => {
  attachPublicRoutes(app);
  attachPrivateRoutes(app);
};

const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};

const attachPrivateRoutes = (app) => {
  app.use(verifyUser);
  app.use('/projects', projectRouter);
};
