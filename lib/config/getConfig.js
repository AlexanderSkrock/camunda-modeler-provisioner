const { cosmiconfigSync } = require('cosmiconfig');

const DefaultConfig = require('./DefaultConfig');

function getConfig () {
    const result = cosmiconfigSync('camunda-modeler').search();
    if (result && result.config) {
        return DefaultConfig.withOverrides(result.config);
    }
    return DefaultConfig;
}

module.exports = getConfig;
