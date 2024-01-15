import { authRouter } from './auth/routes.js';

export const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};
