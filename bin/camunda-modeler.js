const { install, getVersions } = require('../lib');

module.exports = function (args, stdout, stderr) {
    switch(args[0]) {
        case 'versions':
            return getVersions().then((versions) => stdout.write(`Versions:\n${versions.join("\n")}\n`))
        case 'install': {
            return install(args[1]).then((res) => stdout.write(res + '\n'));
        }
        default: stderr.write(`Unknown parameters: ${args}\n`);
    }
};
