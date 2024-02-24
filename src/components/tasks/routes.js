import express from 'express';
import * as controllers from './controllers';

export const taskRouter = express.Router();

taskRouter.post('/', controllers.addTask);
taskRouter.get('/:taskId', controllers.getTask);
taskRouter.get('/', controllers.getTasks);
taskRouter.patch('/:taskId', controllers.updateTask);
taskRouter.delete('/:taskId', controllers.deleteTask);