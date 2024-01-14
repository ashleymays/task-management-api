import { authRouter } from './auth.js';

export const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};
