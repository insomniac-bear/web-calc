const { StatusCodes } = require('http-status-codes');

module.exports.roleCheckMiddleware = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Not enough authority' });
    }

    return next();
  } catch(err) {
    next(err);
  }
};
