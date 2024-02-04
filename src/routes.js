import { authRouter } from './auth';

export const attachRoutes = (app) => {
  app.use('/auth', authRouter);
};