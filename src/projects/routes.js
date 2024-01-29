import express from 'express';
import * as controllers from './controllers';

export const projectRouter = express.Router();

projectRouter.get('/', controllers.getProjectList);
projectRouter.get('/:projectId', controllers.getProject);
projectRouter.post('/', controllers.addProject);
projectRouter.patch('/:projectId', controllers.updateProject);
projectRouter.delete('/:projectId', controllers.removeProject);
