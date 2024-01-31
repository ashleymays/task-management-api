import { STATUS_CODES } from '../shared/constants';
import { catchErrors } from '../shared/utils';
import { NotFoundError } from '../shared/custom-errors';
import * as services from './services';

export const addProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const project = await services.createProject(userId, req.body);
  res.status(STATUS_CODES.CREATED).json(project);
});

export const getProject = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  const project = await services.getProjectById(projectId);

  if (!project) {
    throw new NotFoundError();
  }

  res.status(STATUS_CODES.OK).json(project);
});

export const getProjectList = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const projectList = await services.getAllProjects(userId);
  res.status(STATUS_CODES.OK).json(projectList);
});

export const updateProject = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  const updatedProject = await services.updateProjectById(projectId, req.body);
  res.status(STATUS_CODES.OK).json(updatedProject);
});

export const removeProject = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  await services.removeProjectById(projectId);
  res.sendStatus(STATUS_CODES.NO_CONTENT);
});
