const { resolve } = require('node:path');
const { Platform, ofProcessPlatform, ofShortName } = require('../platform');

class Config {
    getPlatform () {
        if (!this.platform || this.platform instanceof Platform) {
            return this.platform;
        }
        return ofShortName(this.platform) || ofProcessPlatform(this.platform);
    }

    getVersion () {
        return this.version;
    }

    getCachePath () {
        return this.cachePath && resolve(this.cachePath);
    }

    getInstallationPath () {
        return this.installationPath && resolve(this.installationPath);
    }

    shouldOverwriteExistingInstallation () {
        return this.overwriteExistingInstallation;
    }

    getLinkedPlugins () {
        if (!this.linkedPlugins) {
            return [];
        }
        return this.linkedPlugins.map(path => resolve(path));
    }

    withOverrides (otherConfig) {
        const result = Object.assign(new Config(), this);
        Object.entries(otherConfig).forEach(([key, value]) => {
            if (value !== undefined) {
                result[key] = value;
            }
        });
        return result;
    }
}

module.exports = Config;
