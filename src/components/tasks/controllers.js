import { STATUS_CODES } from 'api/shared/constants';
import { catchErrors } from 'api/shared/utils';
import { InvalidCredentialsError } from 'api/shared/errors';
import * as services from './services';

export const addTask = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { projectId, statusId } = req.body;

  if (!projectId || !statusId) {
    throw new InvalidCredentialsError(
      'A project ID and task status are required to create a new task.'
    );
  }

  const task = await services.createTask(userId, req.body);
  res.status(STATUS_CODES.CREATED).json(task);
});
