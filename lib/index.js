const { getConfig } = require('./config');
const download = require('./download');
const install = require('./install');
const launch = require('./launch');
const Platform = require('./platform');
const { getAllVersions } = require('./versions');

module.exports = {
    Platform,

    getAllVersions,
    download: (platform, version) => download(getConfig().withOverrides({
        platform,
        version,
    })),
    install: (platform, version, installationPath, linkedPlugins) => install(getConfig().withOverrides({
        platform,
        version,
        installationPath,
        linkedPlugins,
    })),
    launch: (platform, installationPath) => launch(getConfig().withOverrides({
        platform,
        installationPath,
    })),
};
