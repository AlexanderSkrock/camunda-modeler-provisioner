const { resolve } = require('node:path');

class Config {
    getPlatform () {
        return this.platform;
    }

    getVersion () {
        return this.version;
    }

    getInstallationPath () {
        return this.installationPath && resolve(this.installationPath);
    }

    getLinkedPlugins () {
        if (!this.linkedPlugins) {
            return [];
        }
        return this.linkedPlugins.map(path => resolve(path));
    }

    withOverrides (otherConfig) {
        return Object.assign(new Config(), this, otherConfig);
    }
}

module.exports = Config;
