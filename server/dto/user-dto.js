module.exports = class UserDTO {
  login;
  id;
  role;
  companyId;

  constructor(model) {
    this.login = model.login;
    this.id = model._id;
    this.role = model.role;
    this.companyId = model.companyId;
  }
}