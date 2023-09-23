const { getConfig } = require('./config');
const download = require('./download');
const install = require('./install');
const launch = require('./launch');
const { getAllVersions } = require('./versions');

module.exports = {
    getConfig,
    getAllVersions,
    download: (platform, version, cachePath) => download(getConfig().withOverrides({
        platform,
        version,
        cachePath,
    })),
    install: (platform, version, installationPath, overwriteExistingInstallation, cachePath, linkedPlugins) => install(getConfig().withOverrides({
        platform,
        version,
        installationPath,
        overwriteExistingInstallation,
        cachePath,
        linkedPlugins,
    })),
    launch: (platform, installationPath) => launch(getConfig().withOverrides({
        platform,
        installationPath,
    })),
};
