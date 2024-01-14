const express = require('express');
const controllers = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/login', controllers.login);
authRouter.post('/register', controllers.register);
authRouter.delete('/logout', controllers.logout);

module.exports = { authRouter };
