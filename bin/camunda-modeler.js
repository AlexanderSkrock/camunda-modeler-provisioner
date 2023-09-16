const { install, getAllVersions } = require('../lib');
const { getCurrentOS } = require('./process');

module.exports = function (args, stdout, stderr) {
    switch(args[0]) {
        case 'versions':
            return getAllVersions().then((versions) => stdout.write(`Versions:\n${versions.join("\n")}\n`))
        case 'install': {
            return install(getCurrentOS(), args[1]).then((res) => stdout.write(`Result: ${res}\n`));
        }
        default: return Promise.reject(`Unknown parameters: ${args}`);
    }
};
