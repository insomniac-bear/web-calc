const { StatusCodes } = require('http-status-codes');

module.exports.roleCheckMiddleware = (req, res, next) => {
  try {
    const { userRole, companyId } = req.body;
    if (userRole !== 'admin') {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Not enough authority' });
    }

    res.locals.user = { role, companyId };

    return next();
  } catch(err) {
    next(err);
  }
};
