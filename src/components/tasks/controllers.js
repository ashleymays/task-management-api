import { STATUS_CODES } from 'api/shared/constants';
import { catchErrors } from 'api/shared/utils';
import * as services from './services';

export const addTask = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const task = await services.createTask(userId, req.body);
  res.status(STATUS_CODES.CREATED).json(task);
});
