const { install, getAllVersions } = require('../lib');
const { getCurrentOS } = require('./process');

module.exports = function (args, stdout, stderr) {
    switch (args[0]) {
    case 'versions':
        return getAllVersions().then((versions) => stdout.write(`Versions:\n${versions.join('\n')}\n`));
    case 'download': {
        return download(getCurrentOS(), args[1]).then((res) => stdout.write(`Download was finished successful: ${res}`));
    }
    case 'install': {
        return install(getCurrentOS(), args[1]).then((res) => stdout.write(`Installation was finished successful: ${res}\n`));
    }
    default: return Promise.reject(new Error(`Unknown parameters: ${args}`));
    }
};
