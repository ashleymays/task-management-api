import { STATUS_CODES } from 'api/shared/constants';
import { NotFoundError } from 'api/shared/errors';
import { catchErrors } from 'api/shared/utils';
import * as services from './services';

export const getUser = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const user = await services.getUserById(userId);

  if (!user) {
    throw new NotFoundError();
  }

  res.status(STATUS_CODES.OK).json(user);
});
