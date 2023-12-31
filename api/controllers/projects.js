const prisma = require("../db");
const { catchAsync } = require("../utils");

const getAllProjects = catchAsync(async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: {
      modification_date: "desc",
    },
  });

  res.status(200).json(projects);
})

const getProjectById = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectId),
    },
  });

  res.status(200).json(project);
})

const addProject = catchAsync(async (req, res) => {
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
})

const updateProjectById = catchAsync(async (req, res) => {
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
})

const deleteProjectById = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  await prisma.project.delete({
    where: {
      id: Number(projectId),
    },
  });

  res.sendStatus(204);
})

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProjectById,
  deleteProjectById,
};
