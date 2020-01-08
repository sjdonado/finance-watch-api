const fs = require('fs');
const PATH = require('path');
const { env } = require('../config');

const logger = (path, statusCode, errMessage = null) => {
  const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const status = statusCode === 200 ? 'successfully' : 'failed';
  const message = `${path} - ${date} - ${status} ${errMessage ? `- ${errMessage}` : ''}`;
  fs.appendFile(PATH.join(__dirname, '../logs', `${env}.log`), `${message} \n`, () => {
    console.info(message);
  });
};

module.exports = logger;
