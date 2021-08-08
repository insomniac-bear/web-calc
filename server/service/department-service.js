const Department = require('../schemas/department');

class DepartmentService {
  async getDepartments(companyId, searchParams) {
    if (!companyId) {
      throw new Error('Access denied');
    }

    return await Department
      .find(
        { companyId },
        {
          'departmentName': 1,
          'createdAt': 1,
          'updatedAt': 1
        }
      )
      .populate('authorId', { 'login': 1, '_id': 0 })
  }

  async getDepartment(id) {
    if (!id) {
      throw new Error('Invalid data query');
    }

    return await Department.findById(id);
  }

  async saveDepartment(departmentData) {
    const departmentName = departmentData.departmentName;
    const candidate = await Department.findOne({ departmentName });
    
    if (candidate) {
      throw new Error(`Department ${departmentName} already exist`);
    }

    const savedDepartment = await Department.create(departmentData);
    return savedDepartment;
  }

  async updateDepartment(id, updatedDepartment) {
    const updatedData = await Department.findByIdAndUpdate({_id: id}, updatedDepartment, { new: true });
    return updatedData;
  }

  async getDepartmentsCount(companyId) {
    const count = await Department.countDocuments({ companyId });
    return count;
  }
}

module.exports = new DepartmentService();
