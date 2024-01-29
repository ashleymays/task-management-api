import { authRouter } from './auth';
import { projectRouter } from './projects';

export const attachRoutes = (app) => {
  attachPublicRoutes(app);
  attachPrivateRoutes(app);
};

const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};

const attachPrivateRoutes = (app) => {
  app.use('/projects', projectRouter);
};
