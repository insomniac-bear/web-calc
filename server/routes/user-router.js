// Third party libraries
const { Router } = require('express');
// Controllers
const userController = require('../controllers/user-controller');
// Middlewares
const { authMiddleware } = require('../middleware/auth-middleware');
const { roleCheckMiddleware } = require('../middleware/role-check-middleware');

const userRouter = new Router();

// Authorization route
userRouter.post('/login', userController.login);

// Route for logout from app
userRouter.post(`/logout`, userController.logout);

// JWT Authenticate route
userRouter.get('/refresh', userController.refresh);

// Route for get all users
userRouter.post('/users', [ authMiddleware ], userController.getUsers);

// Route for create user
userRouter.post('/registration', [ authMiddleware ], userController.registration);

module.exports = userRouter;
