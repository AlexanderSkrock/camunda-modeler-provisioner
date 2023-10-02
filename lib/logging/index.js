const logger = require('./logger');
const ProgressTransformStream = require('./ProgressTransformStream');

function info (msg) {
    logger.info(msg);
}

function error (error) {
    logger.error(error);
}

module.exports = {
    info,
    error,
    ProgressTransformStream,
};
