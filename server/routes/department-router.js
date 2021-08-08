// Third party libraries
const { Router } = require('express');
// Controllers
const departmentController = require('../controllers/department-controller');
// Middlewares
const { authMiddleware } = require('../middleware/auth-middleware');

const departmentRouter = new Router();

// Rout for get all departments
departmentRouter.get('/departments', [ authMiddleware ], departmentController.getDepartments);

// Rout for get department with id
departmentRouter.post('/getDepartment', [ authMiddleware ], departmentController.getDepartment);

// Rout for save new department
departmentRouter.post('/department', [ authMiddleware ], departmentController.saveDepartment);

// Rout for update exist department
departmentRouter.post('/update', [ authMiddleware ], departmentController.updateDepartment);

// Rout for get count of saved departments
departmentRouter.get('/count', [ authMiddleware ], departmentController.getDepartmentsCount);

module.exports = departmentRouter;
