const { StatusCodes } = require('http-status-codes');
const departmentService = require('../service/department-service');

class DepartmenController {
  async getDepartments (req, res, next) {
    try {
      const { companyId } = req.body;
      const departments = await departmentService.getDepartments(companyId);
      return res
        .status(StatusCodes.OK)
        .json(departments);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = new DepartmenController();
