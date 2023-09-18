const download = require('./download');
const install = require('./install');
const launch = require('./launch');
const { getAllVersions } = require('./versions');

module.exports = {
    download,
    getAllVersions,
    install,
    launch,
};
