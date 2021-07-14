const { StatusCodes } = require('http-status-codes');
const tokenService = require('../service/token-service');

module.exports.authMiddleware = (req, res, next) => {
  // if (req.method === 'OPTIONS') {
  //   return next();
  // }

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized error' });
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized error' });
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized error' });
    }

    req.user = userData;
    return next();
  } catch(err) {
    next(err);
  }
};
