// Third party libraries
const { StatusCodes } = require('http-status-codes');
// Services
const userService = require('../service/user-service');

class UserController {
  // Registration user
  async registration (req, res, next) {
    try {
      const { login, password, role, companyId } = req.body;
      const userData = await userService.registration(login, password, role, companyId);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 8 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  // Login user
  async login (req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await userService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  // Logout user
  async logout (req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(StatusCodes.OK)
      .send(token);
    } catch (err) {
      next(err);
    }
  }

  // Refresh users token
  async refresh (req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: 'Unauthorized error'
        });
    }
  }

  // Geat all users
  async getUsers (req, res, next) {
    try {
      const { companyId } = req.body;
      const users = await userService.getAllUsers(companyId);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
