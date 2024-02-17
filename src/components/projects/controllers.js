import { STATUS_CODES } from 'api/shared/constants';
import { NotFoundError } from 'api/shared/errors';
import { catchErrors } from 'api/shared/utils';
import * as services from './services';

export const addProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const project = await services.createProject(userId, req.body);
  res.status(STATUS_CODES.CREATED).json(project);
});

export const getAllProjects = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const projects = await services.findProjects(userId);
  res.status(STATUS_CODES.OK).json(projects);
});

export const getProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  const project = await services.findProjectById(projectId, userId);

  if (!project) {
    throw new NotFoundError();
  }

  res.status(STATUS_CODES.OK).json(project);
});

export const updateProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;

  const updatedProject = await services.updateProjectById(
    projectId,
    userId,
    req.body
  );

  if (!updatedProject) {
    throw new NotFoundError();
  }

  res.status(STATUS_CODES.OK).json(updatedProject);
});

export const removeProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  await services.removeProjectById(projectId, userId);
  res.sendStatus(STATUS_CODES.NO_CONTENT);
});
