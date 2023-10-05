class Platform {
    getShortName () {
        return undefined;
    }

    getDisplayName () {
        return undefined;
    }

    getProcessPlatforms () {
        return [];
    }

    getExecutableName () {
        return undefined;
    }

    isSupportedAsset (asset) {
        return false;
    }
}

module.exports = Platform;
