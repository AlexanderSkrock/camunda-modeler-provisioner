const { install } = require('../lib');

module.exports = function (args, stdout, stderr) {
    switch(args[0]) {
        case 'install': {
            return install(args[1]).then(() => stdout.write('Installation succeeded'));
        }
        default: stderr.write(`Unknown parameters: ${args}\n`);
    }
};
