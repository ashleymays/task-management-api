import { StatusCodes } from 'http-status-codes';
import { catchErrors } from 'api/shared/catch-errors';
import * as services from './services';

export const addTask = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId = '' } = req.query;
  const task = await services.createTask(userId, projectId, req.body);
  res.status(StatusCodes.CREATED).json(task);
});

export const getTask = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { taskId } = req.params;
  const task = await services.findTaskById(taskId, userId);
  res.status(StatusCodes.OK).json(task);
});

export const getTasks = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId = '' } = req.query;
  const tasks = await services.findTasks(userId, projectId);
  res.status(StatusCodes.OK).json(tasks);
});

export const updateTask = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { taskId } = req.params;
  const task = await services.updateTaskById(taskId, userId, req.body);
  res.status(StatusCodes.OK).json(task);
});

export const deleteTask = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { taskId } = req.params;
  await services.deleteTaskById(taskId, userId);
  res.sendStatus(StatusCodes.NO_CONTENT);
});
