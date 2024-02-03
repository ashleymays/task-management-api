// import { authRouter } from './auth';
// import { verifyUser } from './shared/middleware.js';

export const attachRoutes = (app) => {
  console.log('attached routes');
  // attachPublicRoutes(app);
  // attachPrivateRoutes(app);
};

const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};

const attachPrivateRoutes = (app) => {
  app.use(verifyUser);
};
