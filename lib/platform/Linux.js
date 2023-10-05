const Platform = require('./Platform');

class Linux extends Platform {
    getShortName () {
        return 'linux';
    }

    getDisplayName () {
        return 'Linux';
    }

    getProcessPlatforms () {
        return ['linux'];
    }

    getExecutablePath () {
        return 'Camunda Modeler';
    }

    isSupportedAsset (asset) {
        const url = asset.browser_download_url;
        return url && url.includes('linux');
    }
}

module.exports = Linux;
