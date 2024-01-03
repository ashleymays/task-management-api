const prisma = require("../db");
const { catchAsyncErrors } = require("../utils");
const { STATUSES } = require("../constants");

const getAllTasks = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.query;
  const where = {};

  if (projectId) {
    where.projectId = Number(projectId);
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy: {
      modificationDate: "desc",
    },
    include: {
      taskStatus: true,
    },
  });

  res.status(STATUSES.OK).json(tasks);
});

const getTask = catchAsyncErrors(async (req, res) => {
  const { taskId } = req.params;

  const task = await prisma.task.findUnique({
    where: {
      id: Number(taskId),
    },
    include: {
      taskStatus: true,
    },
  });

  res.status(STATUSES.OK).json(task);
});

const addTask = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    res
      .status(STATUSES.BAD_REQUEST)
      .json({ message: "Project ID not provided." });
  }

  await prisma.task.create({
    data: {
      ...req.body,
      projectId: Number(projectId),
    },
  });

  res.sendStatus(STATUSES.CREATED);
});

const updateTask = catchAsyncErrors(async (req, res) => {
  const { taskId } = req.params;

  await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      ...req.body,
      isDelayed,
    },
  });

  res.sendStatus(STATUSES.OK);
});

const deleteTask = catchAsyncErrors(async (req, res) => {
  const { taskId } = req.params;

  await prisma.task.delete({
    where: {
      id: Number(taskId),
    },
  });

  res.sendStatus(STATUSES.NO_CONTENT);
});

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
