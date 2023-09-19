const { Platform } = require('../index');

class Config {
    constructor (platform, version, linkedPlugins) {
        this.platform = platform || Platform.currentPlatform();
        this.version = version;
        this.linkedPlugins = linkedPlugins || [];
    }

    getPlatform () {
        return this.platform;
    }

    getVersion () {
        return this.version;
    }

    getLinkedPlugins () {
        return this.linkedPlugins;
    }
}

module.exports = Config;
