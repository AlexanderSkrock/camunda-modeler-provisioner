const Config = require('./Config');

let OVERRIDE_CONFIG = new Config();

function overrideConfig (config) {
    OVERRIDE_CONFIG = OVERRIDE_CONFIG.withOverrides(config);
}

module.exports = {
    OverrideConfig: OVERRIDE_CONFIG,
    overrideConfig,
};
