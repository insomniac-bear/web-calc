const jwt = require('jsonwebtoken');
const Token = require('../schemas/token');

/**
 * ASCCESS_SECRET & REFRESH_SECRET - secret phrases for crypt tokens.
 * This secret phrases set in variables of environment
 */
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

/**
 * @class TokenService - Service for work with tokens
 */
class TokenService {
  /** 
   * @method generateTokens - Method for generate access and refresh tokens
   * @param {Object} payload - Auth payload for tokens
   * @returns {Object} Access token and refresh token
  */
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '8h' });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * @method validateAccessToken - Method for check access token
   * @param {String} accessToken - Access token for validate
   * @returns information about user, or null if token expire
   */
  validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, ACCESS_SECRET);
      return userData;
    } catch(err) {
      return null;
    }
  }

  /**
   * @method validateRefreshToken - Method for check refresh token
   * @param {String} refreshToken - Refresh token for validate
   * @returns information about user, or null if token expire
   */
  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  /**
   * @method saveToken - Method for save refresh token in the database
   * @param {String} userId - user's id which token will be save
   * @param {String} refreshToken - refresh token for save in the database
   * @returns {String} token - refresh tooken, which saved in the database
   */
  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({userId, refreshToken});
    return token;
  }

  /**
   * @method removeToken - Method for delete token from database
   * @param {String} refreshToken - token for delete from database
   * @returns {String} tokenData - removed token
   */
  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({refreshToken});
    return tokenData;
  }

  /**
   * @method findToken - Method for search refresh token in the database
   * @param {String} refreshToken - token for search in the database
   * @returns {String} tokenData - refreshToken, witch found in the database 
   */
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({refreshToken});
    return tokenData;
  }
};

module.exports = new TokenService();
