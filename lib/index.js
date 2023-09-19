const { resolve } = require('node:path');

const download = require('./download');
const install = require('./install');
const launch = require('./launch');
const { getAllVersions } = require('./versions');

module.exports = {
    download,
    getAllVersions,
    install: (os, version, installationPath, linkedPluginPath) => install(os, version, resolve(installationPath), resolve(linkedPluginPath)),
    launch: (os, installationPath) => launch(os, resolve(installationPath)),
};
