const { StatusCodes } = require('http-status-codes');
const departmentService = require('../service/department-service');

class DepartmenController {
  async getDepartments (req, res, next) {
    try {
      const companyId = req.user.companyId;
      const departments = await departmentService.getDepartments(companyId );
      return res
        .status(StatusCodes.OK)
        .json(departments);
    } catch (err) {
      next(err);
    }
  }

  async getDepartment (req, res, next) {
    try {
      const { id } = req.body;
      const department = await departmentService.getDepartment(id);
      return res
        .status(StatusCodes.OK)
        .json(department);
    } catch (err) {
      next(err);
    }
  }

  async saveDepartment (req, res, next) {
    try {
      const newDepartment = req.body;
      const savedDepartment = await departmentService.saveDepartment(newDepartment);
      return res.json(savedDepartment);
    } catch (err) {
      next(err);
    }
  }

  async updateDepartment (req, res, next) {
    try {
      const updateDepartment = req.body;
      const updatedDepartment = await departmentService.updateDepartment(updateDepartment._id, updateDepartment);

      return res.json(updatedDepartment);
    } catch (err) {
      next(err);
    }
  }

  async getDepartmentsCount (req, res, next) {
    try {
      const companyId = req.user.companyId;
      const count = await departmentService.getDepartmentsCount(companyId);

      return res.json(count);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = new DepartmenController();
