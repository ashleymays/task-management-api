import { STATUS_CODES } from 'api/shared/constants';
import { catchErrors } from 'api/shared/utils';
import * as services from './services';

export const addProject = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const project = await services.createProject(userId, req.body);
  res.status(STATUS_CODES.CREATED).json(project);
});
