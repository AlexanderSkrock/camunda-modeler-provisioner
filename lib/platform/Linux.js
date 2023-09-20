const Platform = require('./Platform');

class Linux extends Platform {
    getShortName () {
        return 'linux';
    }

    getProcessPlatforms () {
        return ['linux'];
    }

    getExecutablePath () {
        return 'Camunda Modeler';
    }
}

module.exports = Linux;
