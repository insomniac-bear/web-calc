const pino = require('pino');

const LOG_FILE = './logs/api.log';
const defaultLogLevel = 'info';

const logger = pino({
  name: 'base-logger',
  level: defaultLogLevel,
  prettyPrint: true,
}, process.stdout);

module.exports = {
  logger,
  getLogger(options={}) {
    return logger.child(options);
  }
};
