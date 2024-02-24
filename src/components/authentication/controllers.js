import { StatusCodes } from 'http-status-codes';
import { catchErrors } from 'api/shared/catch-errors';
import * as services from './services';

export const login = catchErrors(async (req, res) => {
  const user = await services.findUser(req.body);
  const token = await services.createUserToken(user.id);
  const userWithoutSensitiveData = services.getUserWithoutSensitiveData(user);
  res
    .set('Authorization', `Bearer ${token}`)
    .status(StatusCodes.OK)
    .json(userWithoutSensitiveData);
});

export const register = catchErrors(async (req, res) => {
  const user = await services.findOrCreateUser(req.body);
  const token = await services.createUserToken(user.id);
  res
    .set('Authorization', `Bearer ${token}`)
    .status(StatusCodes.CREATED)
    .json(user);
});

export const logout = catchErrors(async (req, res) => {
  req.user = {};
  res.sendStatus(StatusCodes.NO_CONTENT);
});
