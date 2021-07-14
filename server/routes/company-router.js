// Third party libraries
const { Router } = require('express');
// Controllers
const companyController = require('../controllers/company-controller');
// Middlewares
const { authMiddleware } = require('../middleware/auth-middleware');

const companyRouter = new Router();

// Route for get company name
companyRouter.post('/company', companyController.getCompany);

module.exports = companyRouter;
