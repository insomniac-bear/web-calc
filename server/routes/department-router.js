// Third party libraries
const { Router } = require('express');
// Controllers
const departmentController = require('../controllers/department-controller');
// Middlewares
const { authMiddleware } = require('../middleware/auth-middleware');

const departmentRouter = new Router();

// Rout for get all departments
departmentRouter.get('/departments', departmentController.getDepartments);

module.exports = departmentRouter;
