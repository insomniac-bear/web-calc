const bcrypt = require('bcryptjs');
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
      throw new Error('This login is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, SALT);
    const user = await User.create({ login, password: hashedPassword, role, companyId });
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDTO,
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
    const users = await User.find({ companyId }, {'login': 1, 'createdAt': 1});
    return users;
  }
};

module.exports = new UserService();
