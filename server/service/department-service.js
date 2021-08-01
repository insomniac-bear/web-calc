const Department = require('../schemas/department');

class DepartmentService {
  async getDepartments(companyId) {
    if (!companyId) {
      throw new Error('Access denied');
    }

    return await Department.find({ compnyId });
  }

  async saveDepartment(newDepartment) {
    const name = newDepartment.departmentName;
    const candidate = await Department.findOne({ name });
    
    if (candidate) {
      throw new Error(`Department ${name} already exist`);
    }

    const savedDepartment = await Department.create(newDepartment);
    return savedDepartment;
  }
}

module.exports = new DepartmentService();
