const Platform = require('./Platform');

class Linux extends Platform {
    getShortName () {
        return 'win';
    }

    getDisplayName () {
        return 'Windows';
    }

    getProcessPlatforms () {
        return ['win32'];
    }

    getExecutablePath () {
        return 'Camunda Modeler.exe';
    }

    isSupportedAsset (asset) {
        const url = asset.browser_download_url;
        // There are 32 bit and 64 bit distributions, but Node only gives us win32 as process platform.
        // So to be safe we also use the 32 bit artifact.
        return url && url.includes('win') && url.includes('32');
    }
}

module.exports = Linux;
