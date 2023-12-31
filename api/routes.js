const projects = require("./controllers/projects");
const tasks = require('./controllers/tasks');

const attachRoutes = (app) => {
  app.get("/projects", projects.getAllProjects);
  app.get("/projects/:projectId", projects.getProjectById);
  app.post("/projects", projects.addProject);
  app.put("/projects/:projectId", projects.updateProjectById);
  app.delete("/projects/:projectId", projects.deleteProjectById);

  app.get("/tasks", tasks.getAllTasks);
}

module.exports = attachRoutes;
