const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const UserDTO = require('../dto/user-dto');
const User = require('../schemas/user');
const tokenService = require('../service/token-service');

const SALT = Number(process.env.SALT);

class UserService {
  /**********************************************************************
   * @method Registration - method for create user
   *
   * @param {String} login - login of saving user 
   * @param {String} password - password of saving user
   * @param {String} role - role of user in systen
   * @param {String} companyId - id of company where user is works
   */
  async registration(login, password, role, companyId) {
    const candidate = await User.findOne({ login });

    if (candidate) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: `Login ${login} is already in use`,
        data: {},
      }
    }

    const hashedPassword = await bcrypt.hash(password, SALT);
    const user = await User.create({ login, password: hashedPassword, role, companyId });
    const userDTO = new UserDTO(user);

    return {
      status: StatusCodes.OK,
      message: `User with login ${login} was create`,
      data: {
        user: userDTO,
      }
    }
  }

  /**********************************************************************
   * @method login - method for authorization user
   *
   * @param {String} login - users login
   * @param {String} password - raw users password
   */
  async login(login, password) {
    const user = await User.findOne({ login });
    if (!user) {
      throw new Error('Invalid authorization data');
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new Error('Invalid authorization data');
    }

    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });

    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDTO
    }
  }

  /*********************************************************************
   * @method logout - method for delete refresh token from database
   *
   * @param {String} refreshToken - token for refresh
   * @returns {String} token - token, which was delete
   */
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  /*********************************************************************
   * @method refresh - method for refresh tokens
   *
   * @param {String} refreshToken - token for refresh authenticated data
   * @returns tokens and users data
   */
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error(`Unauthorized error: ${refreshToken}`);
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDatabase = tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDatabase) {
      tokenService.removeToken(refreshToken);
      throw new Error('Unauthorized error');
    }

    tokenService.removeToken(refreshToken);
    const user = await User.findById(userData.id);
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });

    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDTO
    }
  }
  /**********************************************************************
   * @method getAllUsers - method for get all users from database
   * @param {String} companyId - company id, which users we need
   * @returns {Array} users - list of all users from database
   */
  async getAllUsers(companyId) {
    if (!companyId) {
      throw new Error('Bad request');
    }
    const users = await User.find({ companyId, role: {$ne: 'admin'} }, {'login': 1, 'role': 1,'createdAt': 1});
    return users;
  }

  /**********************************************************************
   * @method GetUserWithId - method for get user with id from database
   * @param {String} userId - id of search user
   * @returns {Object} status, message, data - found user
   */
  async getUserWithId(userId) {
    if (!userId) {
      throw new Error('Invalid data');
    }

    const candidate = await User.findById({ _id: userId }, {'login': 1, 'role': 1});

    if (!candidate) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: `User not found`,
        data: {},
      };
    }

    return {
      status: StatusCodes.OK,
      message: 'success',
      data: {
        user: candidate
      },
    }
  }

  /**
   * @method updateUser - method for update user with id
   * @param {String} userId - id of user who is update
   * @param {Object} data - new data of user
   * @returns {Object}
   */
  async updateUser(userId, data) {
    const candidate = await User.findById({ _id: userId });

    if (!candidate) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: `User not found`,
        data: {},
      };
    }

    if ('password' in data) {
      const hashedPassword = await bcrypt.hash(data.password, SALT);
      data = { ...data, password: hashedPassword };
    }

    const updatedUser = await User.updateOne({_id: userId}, { ...data });
    return {
      status: StatusCodes.OK,
      message: 'success',
      data: {
        user: updatedUser,
      },
    }
  }

  /**
   * @method deleteUser - method for delete user wth id from database
   * @param {String} userId - id of user who is delete
   * @returns 
   */
  async deleteUser(userId) {
    const deletedUser = await User.deleteOne({_id: userId});
    if (!deletedUser) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: `User not found`,
        data: {},
      };
    }

    return {
      status: StatusCodes.OK,
      message: 'success',
      data: {},
    }
  };
}

module.exports = new UserService();
