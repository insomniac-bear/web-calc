const Company = require('../schemas/company');

class CompanyService {
  async getCompany (companyId) {

    const company = await Company.find({_id: companyId});
    return company;
  }
};

module.exports = new CompanyService();
