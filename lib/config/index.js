const Config = require('./Config');
const getConfig = require('./getConfig');
const { overrideConfig } = require('./OverrideConfig');

console.error('Overrides' + JSON.stringify(require('./OverrideConfig')));

module.exports = {
    Config,
    getConfig,
    overrideConfig,
};
