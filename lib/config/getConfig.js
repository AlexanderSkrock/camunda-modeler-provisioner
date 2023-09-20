const { cosmiconfigSync } = require('cosmiconfig');
const Config = require('./Config');

const DefaultConfig = require('./DefaultConfig');
const { OverrideConfig } = require('./OverrideConfig');

const CONFIG_PROVIDERS = [
    () => {
        const result = cosmiconfigSync('camunda-modeler').search();
        if (!result || !result.config) {
            return new Config();
        }
        return new Config().withOverrides(result.config);
    },
    () => OverrideConfig,
];

function getConfig () {
    return CONFIG_PROVIDERS.reduce((config, configProvider) => config.withOverrides(configProvider()), DefaultConfig);
}

module.exports = getConfig;
