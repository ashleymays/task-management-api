const prisma = require('../db');
const { catchAsyncErrors } = require('../utils');
const { STATUSES } = require('../constants');

const getAllProjects = catchAsyncErrors(async (req, res) => {
  const projects = await prisma.project.findMany({
    where: {
      userId: req.userId
    },
    orderBy: {
      modificationDate: 'desc'
    }
  });
  res.status(STATUSES.OK).json(projects);
});

const getProject = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectId)
    }
  });

  res.status(STATUSES.OK).json(project);
});

const addProject = catchAsyncErrors(async (req, res) => {
  const { name, description = '' } = req.body;

  await prisma.project.create({
    data: {
      name,
      description
    }
  });

  res.sendStatus(STATUSES.CREATED);
});

const updateProject = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.params;
  const { name, description = '' } = req.body;

  await prisma.project.update({
    where: {
      id: Number(projectId)
    },
    data: {
      name,
      description
    }
  });

  res.sendStatus(STATUSES.OK);
});

const deleteProject = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.params;

  await prisma.project.delete({
    where: {
      id: Number(projectId)
    }
  });

  res.sendStatus(STATUSES.NO_CONTENT);
});

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject
};
