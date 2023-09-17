const download = require('./download');
const install = require('./install');
const { getAllVersions } = require('./versions');

module.exports = {
    download,
    install,
    getAllVersions,
};
