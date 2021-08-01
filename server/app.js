// Third party libraries
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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
const PORT = process.env.NODE_ENV === `production` ? process.env.PRODUCTION_PORT : 8000;
const uriDb = process.env.CONNECTION_STRING;
const CLIENT_URL = !process.env.NODE_ENV ? process.env.DEV_CLIENT_URL : process.env.PRODUCTION_CLIENT_URL;

// const allowedDomains = [
//   `${CLIENT_URL}`,
//   `${CLIENT_URL}/`,
//   `${CLIENT_URL}/login`,
//   `${CLIENT_URL}/settings`,
//   `${CLIENT_URL}/calculations`
// ];

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: (origin, callback) => {
// 		if (!allowedDomains.includes(origin)) {
// 			const msg = `Access denied`;
// 			return callback(new Error(msg), false);
// 		}
// 		return callback(null, true);
//   },
//   methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
//   credentials: true,
// }));
// Connect routes API
app.use('/api/user', userRouter);
app.use('/api/department', departmentRouter);
app.use('/api/companies', companyRouter);

// use static file index.html on production mode
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// Logger fo all request
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
    app.listen(PORT, () => logger.info(chalk.green(`Server API has been started on port ${ PORT }`)));
  } catch (err) {
    logger.error(chalk.red(`Server error: ${ err.message }`));
    process.exit(ExitCode.ERROR);
  }
};

start();
