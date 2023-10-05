const { join } = require('node:path');

const Platform = require('./Platform');

class Mac extends Platform {
    getShortName () {
        return 'mac';
    }

    getDisplayName () {
        return 'MacOS';
    }

    getProcessPlatforms () {
        return ['darwin'];
    }

    getExecutablePath () {
        return join('Contents', 'MacOS', 'Camunda Modeler');
    }

    isSupportedAsset (asset) {
        const url = asset.browser_download_url;
        // For MacOS we explicitly use the zip artifact because it is easier to handle than .dmg
        return url && url.includes('mac') && url.includes('.zip');
    }
}

module.exports = Mac;
