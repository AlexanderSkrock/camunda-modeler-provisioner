const { cosmiconfigSync } = require('cosmiconfig');

const Configuration = require('Config');
const mergeConfig = require('./mergeConfig');

function getConfig () {
    const result = cosmiconfigSync('camunda-modeler').search();
    if (result && result.config) {
        return mergeConfig(new Configuration(), result.config);
    }
    return new Configuration();
}

module.exports = getConfig;
