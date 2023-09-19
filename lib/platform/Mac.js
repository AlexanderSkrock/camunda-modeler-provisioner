const { join } = require('node:path');

const { Platform } = require('./index');

class Linux extends Platform {
    getShortName () {
        return 'linux';
    }

    getProcessPlatforms () {
        return ['darwin'];
    }

    getExecutablePath () {
        return join('Contents', 'MacOS', 'Camunda Modeler');
    }
}

module.exports = Linux;
