class Config {
    getPlatform () {
        return this.platform;
    }

    getVersion () {
        return this.version;
    }

    getLinkedPlugins () {
        return this.linkedPlugins;
    }

    withOverrides (otherConfig) {
        return Object.assign(new Config(), this, otherConfig);
    }
}

module.exports = Config;
