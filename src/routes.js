import { authRouter } from 'api/authentication';

export const attachRoutes = (app) => {
  app.use('/auth', authRouter);
};
