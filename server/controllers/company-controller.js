// Services
const companyService = require('../service/company-service');

class CompanyController {
  // Get company by company id
  async getCompany (req, res, next) {
    try {
      const { companyId } = req.body;
      const companyName = await companyService.getCompany(companyId);
      return res.json(companyName);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = new CompanyController();
