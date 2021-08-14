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
userRouter.post('/users', [ authMiddleware, roleCheckMiddleware ], userController.getUsers);

// Route for create user
userRouter.post('/registration', [ authMiddleware, roleCheckMiddleware ], userController.registration);

// Route for get user with id
userRouter.post('/user', [ authMiddleware, roleCheckMiddleware ], userController.getUser);

// Route for update user with id
userRouter.patch('/user', [ authMiddleware, roleCheckMiddleware ], userController.updateUser);

// Route for delete user with id
userRouter.delete('/user', [ authMiddleware, roleCheckMiddleware ], userController.deleteUser);

module.exports = userRouter;
