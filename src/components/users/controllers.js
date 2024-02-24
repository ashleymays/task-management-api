import { StatusCodes } from 'http-status-codes';
import { catchErrors } from 'api/shared/catch-errors';
import * as services from './services';

export const getUser = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const user = await services.findUserById(userId);
  res.status(StatusCodes.OK).json(user);
});

export const updateUser = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const updatedUser = await services.updateUserById(userId, req.body);
  res.status(StatusCodes.OK).json(updatedUser);
});

export const removeUser = catchErrors(async (req, res) => {
  const { userId } = req.user;
  await services.deleteUserById(userId);
  res.sendStatus(StatusCodes.NO_CONTENT);
});
