const Platform = require('./Platform');

class Linux extends Platform {
    getShortName () {
        return 'win';
    }

    getProcessPlatforms () {
        return ['win32'];
    }

    getExecutablePath () {
        return 'Camunda Modeler.exe';
    }
}

module.exports = Linux;
