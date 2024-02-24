import { StatusCodes } from 'http-status-codes';
import { catchErrors } from 'api/shared/catch-errors';
import * as services from './services';

export const getAllProjects = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const projects = await services.findProjects(userId);
  res.status(StatusCodes.OK).json(projects);
});

export const addProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const project = await services.createProject(userId, req.body);
  res.status(StatusCodes.CREATED).json(project);
});

export const getProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  const project = await services.findProjectById(projectId, userId);
  res.status(StatusCodes.OK).json(project);
});

export const updateProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;

  const updatedProject = await services.updateProjectById(
    projectId,
    userId,
    req.body
  );

  res.status(StatusCodes.OK).json(updatedProject);
});

export const removeProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  await services.deleteProjectById(projectId, userId);
  res.sendStatus(StatusCodes.NO_CONTENT);
});
