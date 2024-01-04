const projects = require('./controllers/projects');
const tasks = require('./controllers/tasks');
const users = require('./controllers/users');

const { verifyToken } = require('./middleware/auth');

const attachRoutes = (app) => {
  app.get('/users/:userId', verifyToken, users.getUser);
  app.post('/users', users.addUser);

  app.get('/projects', projects.getAllProjects);
  app.post('/projects', projects.addProject);
  app.get('/projects/:projectId', projects.getProject);
  app.put('/projects/:projectId', projects.updateProject);
  app.delete('/projects/:projectId', projects.deleteProject);

  app.get('/tasks', tasks.getAllTasks);
  app.post('/tasks', tasks.addTask);
  app.get('/tasks/:taskId', tasks.getTask);
  app.put('/tasks/:taskId', tasks.updateTask);
  app.delete('/tasks/:taskId', tasks.deleteTask);
};

module.exports = attachRoutes;
