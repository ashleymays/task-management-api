const { projectsRouter } = require('./projects/projects.routes');

const attachRoutes = (app) => {
  app.get('/projects', projectsRouter);
}

module.exports = { attachRoutes };