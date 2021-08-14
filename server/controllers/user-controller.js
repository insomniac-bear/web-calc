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
      if (userData.status === StatusCodes.BAD_REQUEST) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            status: userData.message,
            data: userData.data,
          })
      }

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

  // Get user with id
  async getUser (req, res, next) {
    try {
      const { userId } = req.body;
      const userData = await userService.getUserWithId(userId);
      if (userData.status === StatusCodes.BAD_REQUEST) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            status: userData.message,
            data: userData.data,
          });
      }

      return res
        .status(StatusCodes.OK)
        .json({
          status: userData.message,
          data: userData.data
        });
    } catch (err) {
      next(err);
    }
  }

  // Update user with id
  async updateUser (req, res, next) {
    try {
      const userData = req.body;
      const data = await userService.updateUser(userData.id, userData);

      if (data.status === StatusCodes.BAD_REQUEST) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            status: data.message,
            data: data.data,
          });
      }

      return res
        .status(StatusCodes.OK)
        .json({
          status: data.message,
          data: data.data
        });
    } catch (err) {
      next(err);
    }
  }

  // Delete user with id
  async deleteUser (req, res, next) {
    try {
      const { userId } = req.body;
      const data = await userService.deleteUser(userId);

      if (data.status === StatusCodes.BAD_REQUEST) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            status: data.message,
            data: data.data,
          });
      }

      return res
        .status(StatusCodes.OK)
        .json({
          status: data.message,
          data: data.data
        });
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UserController();
