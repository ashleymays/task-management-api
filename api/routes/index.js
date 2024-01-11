const { authRouter } = require('./auth');

const attachPublicRoutes = (app) => {
  app.use('/auth', authRouter);
};

module.exports = { attachPublicRoutes };