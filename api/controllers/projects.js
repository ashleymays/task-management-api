const prisma = require("../db");
const { catchAsync } = require("../utils");

async function getAllProjects(req, res) {
  const projects = await prisma.project.findMany({
    orderBy: {
      modification_date: "desc",
    },
  });

  res.status(200).json(projects);
}

async function getProjectById(req, res) {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectId),
    },
  });

  res.status(200).json(project);
}

async function addProject(req, res) {
  const { name, description = "" } = req.body;
  const now = new Date().toJSON();

  await prisma.project.create({
    data: {
      name: String(name),
      description: String(description),
      creation_date: now,
      modification_date: now,
    },
  });

  return res.sendStatus(201);
}

async function updateProjectById(req, res) {
  const { projectId } = req.params;
  const { name, description = "" } = req.body;
  const now = new Date().toJSON();

  await prisma.project.update({
    where: {
      id: Number(projectId),
    },
    data: {
      name: String(name),
      description: String(description),
      modification_date: now,
    },
  });

  res.sendStatus(200);
}

async function deleteProjectById(req, res) {
  const { projectId } = req.params;

  await prisma.project.delete({
    where: {
      id: Number(projectId),
    },
  });

  res.sendStatus(204);
}

module.exports = {
  getAllProjects: catchAsync(getAllProjects),
  getProjectById: catchAsync(getProjectById),
  addProject: catchAsync(addProject),
  updateProjectById: catchAsync(updateProjectById),
  deleteProjectById: catchAsync(deleteProjectById),
};
