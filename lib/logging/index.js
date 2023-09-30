const logger = require('./logger');

function info (msg) {
    logger.info(msg);
}

function error (error) {
    logger.error(error);
}

module.exports = {
    info,
    error,
};
