import express from 'express';
import * as controllers from './controllers';

export const userRouter = express.Router();

userRouter.get('/me', controllers.getUser);
userRouter.patch('/me', controllers.updateUser);
userRouter.delete('/me', controllers.removeUser);
