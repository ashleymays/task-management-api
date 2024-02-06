import { authRouter } from 'api/auth';

export const attachRoutes = (app) => {
  app.use('/auth', authRouter);
};
