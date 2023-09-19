const { resolve } = require('node:path');

const { getConfig, Config, overrideConfig } = require('./config');
const download = require('./download');
const install = require('./install');
const launch = require('./launch');
const Platform = require('./platform');
const { getAllVersions } = require('./versions');

module.exports = {
    Platform,
    Config,

    getConfig,
    overrideConfig,

    download,
    getAllVersions,
    install: (platform, version, installationPath, linkedPluginPath) => install(platform, version, resolve(installationPath), resolve(linkedPluginPath)),
    launch: (platform, installationPath) => launch(platform, resolve(installationPath)),
};
