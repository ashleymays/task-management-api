const express = require("express");
const controllers = require("./projects.controllers");

const projectRouter = express.Router();

projectRouter.get("/", controllers.getProjectList);
projectRouter.get("/:projectId", controllers.getProject);
projectRouter.post("/", controllers.addProject);

module.exports = { projectRouter };
