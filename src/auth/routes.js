import express from 'express';
import * as controllers from './controllers';

export const authRouter = express.Router();

authRouter.post('/login', controllers.login);
authRouter.post('/register', controllers.register);
authRouter.delete('/logout', controllers.logout);
