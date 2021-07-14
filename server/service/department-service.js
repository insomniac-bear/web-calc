const Department = require('../schemas/department');

class DepartmentService {
  async getDepartments(companyId) {
    if (!companyId) {
      throw new Error('Access denied');
    }

    return await Department.find({ compnyId });
  }
}

module.exports = new DepartmentService();
