const { join } = require('node:path');

const Platform = require('./Platform');

class Mac extends Platform {
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

module.exports = Mac;
