import express from 'express';
import * as controllers from './controllers';

export const taskRouter = express.Router();

taskRouter.post('/', controllers.addTask);
