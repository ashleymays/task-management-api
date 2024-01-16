const { STATUS_CODES } = require("../constants");
const { catchErrors } = require("../utils");
const { prismaWrapper } = require("../database/wrapper");
const { prisma } = require("../database");
const { NotFoundError } = require('../custom-errors');


const prismaProject = prismaWrapper(prisma.project);


/**
 * Add project to database.
 * @async
 */
const addProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const project = await prismaProject.addOne(userId, req.body);
  res.status(STATUS_CODES.CREATED).json(project);
});


/**
 * Gets one project from the database.
 * @async
 */
const getProject = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  const project = await prismaProject.getOne(projectId);

  if (!project) {
    res.status(STATUS_CODES.NOT_FOUND).json(NotFoundError());
  }

  res.status(STATUS_CODES.OK).json(project);
});


/**
 * Gets a list of projects from the database.
 * @async
 */
const getProjectList = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const projectList = await prismaProject.getMany(userId);
  res.status(STATUS_CODES.OK).json(projectList);
});


module.exports = {
  addProject,
  getProject,
  getProjectList,
};
