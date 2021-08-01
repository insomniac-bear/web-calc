// Third party libraries
const { Router } = require('express');
// Controllers
const departmentController = require('../controllers/department-controller');
// Middlewares
const { authMiddleware } = require('../middleware/auth-middleware');

const departmentRouter = new Router();

// Rout for get all departments
departmentRouter.get('/departments', [authMiddleware], departmentController.getDepartments);

// Rout for save new department
departmentRouter.post('/department', [authMiddleware], departmentController.saveDepartment);

module.exports = departmentRouter;
