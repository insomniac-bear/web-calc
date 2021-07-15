const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
// Routes
const companyRouter = require('./routes/company-router');
const departmentRouter = require('./routes/department-router');
const userRouter = require('./routes/user-router');
// Helpers modules
const { getLogger } = require('./lib/logger');
const { ExitCode } = require('./constants');

const app = express();
const logger = getLogger({name: 'api'});

const DEFAULT_PORT = 8000;
const uriDb = process.env.CONNECTION_STRING;
const CLIENT_URL = process.env.CLIENT_URL;
const allowedDomains = [
  `${CLIENT_URL}`,
  `${CLIENT_URL}/`,
  `${CLIENT_URL}/settings`,
  `${CLIENT_URL}/calculations`
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
		if (!allowedDomains.includes(origin)) {
			const msg = `Access denied`;
			return callback(new Error(msg), false);
		}
		return callback(null, true);
  },
  methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
  credentials: true,
  preflightContinue: false,
}));
// Connect routes API
app.use('/api/user', userRouter);
app.use('/api/department', departmentRouter);
app.use('/api/companies', companyRouter);

app.use((req, res, next) => {
  logger.info(chalk.green(`Request on route ${req.url}`));
  res.on('finish', () => {
    logger.info(chalk.blue(`Response status code is ${res.statusCode}`));
  });
  return next();
});

// Catch all server errors
app.use((err, _req, res, _next) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      message: `Server error: ${err}`,
      data: []
    });
  logger.error(chalk.red(`An error occured on processing request: ${err}`));
});
// Catch all unhandled rejection
process.on(`unhandledRejection`, (reason, promise) => {
  logger.error(chalk.red(`Unhandled Rejection at: ${promise}, reason: ${reason}`));
});
// Server function
async function start() {
  try {
    // Connect to database
    await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // Listen port
    app.listen(DEFAULT_PORT, () => logger.info(chalk.green(`Server API has been started on port ${ DEFAULT_PORT }`)));
  } catch (err) {
    logger.error(chalk.red(`Server error: ${ err.message }`));
    process.exit(ExitCode.ERROR);
  }
};

start();
