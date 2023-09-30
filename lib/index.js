const { getConfig } = require('./config');
const download = require('./download');
const install = require('./install');
const launch = require('./launch');
const { getAllVersions } = require('./versions');

module.exports = {
    getConfig,
    getAllVersions,
    download: (options) =>  download(getConfig().withOverrides(options)),
    install: (options) => install(getConfig().withOverrides(options)),
    launch: (options) => launch(getConfig().withOverrides(options)),
};
