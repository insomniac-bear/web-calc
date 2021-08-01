const Department = require('../schemas/department');

class DepartmentService {
  async getDepartments(companyId) {
    if (!companyId) {
      throw new Error('Access denied');
    }

    return await Department.find({ companyId }, {'departmentName': 1});
  }

  async saveDepartment(newDepartment) {
    const departmentName = newDepartment.departmentName;
    const candidate = await Department.findOne({ departmentName });
    
    if (candidate) {
      throw new Error(`Department ${departmentName} already exist`);
    }

    const savedDepartment = await Department.create(newDepartment);
    return savedDepartment;
  }
}

module.exports = new DepartmentService();
