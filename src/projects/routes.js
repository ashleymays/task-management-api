import express from 'express';
import * as controllers from './controllers';

export const projectRouter = express.Router();

projectRouter.post('/', controllers.addProject);
