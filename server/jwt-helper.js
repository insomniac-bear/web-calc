const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

module.exports.makeTokens = (tokenData) => {
  const accessToken = jwt.sign(tokenData, ACCESS_SECRET, { expiresIn:  '10m'});
  const refreshToken = jwt.sign(tokenData, REFRESH_SECRET, { expiresIn: '8h' });

  return { accessToken, refreshToken };
};
