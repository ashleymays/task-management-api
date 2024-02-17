import express from 'express';
import * as controllers from './controllers';

export const projectRouter = express.Router();

projectRouter.get('/', controllers.getAllProjects);
projectRouter.post('/', controllers.addProject);
projectRouter.get('/:projectId', controllers.getProject);
projectRouter.patch('/:projectId', controllers.updateProject);
projectRouter.delete('/:projectId', controllers.removeProject);
