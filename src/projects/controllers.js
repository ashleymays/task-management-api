import { STATUS_CODES } from '../constants';
import { catchErrors } from '../utils';
import { NotFoundError } from '../custom-errors';
import * as Project from './services';

export const addProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const project = await Project.add(userId, req.body);
  res.status(STATUS_CODES.CREATED).json(project);
});

export const getProject = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.get(projectId);

  if (!project) {
    res.status(STATUS_CODES.NOT_FOUND).json(new NotFoundError());
  }

  res.status(STATUS_CODES.OK).json(project);
});

export const getProjectList = catchErrors(async (req, res) => {
  // const { userId } = req.user;
  console.log(req.user);
  // const projectList = await Project.getList(userId);
  res.status(STATUS_CODES.OK).json({});
});

export const updateProject = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  const updatedProject = await Project.update(projectId, req.body);

  if (!updatedProject) {
    res.status(STATUS_CODES.NOT_FOUND).json(new NotFoundError());
  }

  res.status(STATUS_CODES.OK).json(updatedProject);
});

export const removeProject = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  await Project.remove(projectId);
  res.sendStatus(STATUS_CODES.NO_CONTENT);
});
