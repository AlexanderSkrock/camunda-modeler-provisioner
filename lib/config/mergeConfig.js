const Config = require('./Config');

function mergeConfig (...configs) {
    if (!configs || configs.length < 1) {
        return new Config();
    }

    return configs
        .flatMap(config => Object.entries(config))
        .filter(([, value]) => value !== undefined)
        .reduce((prev, [key, value]) => {
            const result = Object.assign(prev, new Config());
            result[key] = value;
            return result;
        }, new Config());
}

module.exports = mergeConfig;
