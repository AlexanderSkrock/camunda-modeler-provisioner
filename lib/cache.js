const { access, constants, mkdir, writeFile } = require('node:fs/promises');
const { homedir } = require('node:os');
const { join } = require('node:path');

const DEFAULT_CACHE_LOCATION = join(homedir(), '.cache', 'camunda-modeler');

function ensureCacheDirectory () {
    return mkdir(DEFAULT_CACHE_LOCATION, {
        recursive: true,
    }).then(() => DEFAULT_CACHE_LOCATION);
}

function isInCache (cacheKey) {
    return ensureCacheDirectory()
        .then(cachePath => join(cachePath, cacheKey))
        .then(filePath => access(filePath, constants.W_OK | constants.R_OK));
}

function getFromCache (cacheKey) {
    return isInCache(cacheKey)
        .then(() => ensureCacheDirectory())
        .then(cachePath => join(cachePath, cacheKey));
}

function putStreamInCache (cacheKey, stream) {
    return ensureCacheDirectory()
        .then(cachePath => join(cachePath, cacheKey))
        .then(filePath => writeFile(filePath, stream))
        .then(() => cacheKey);
}

module.exports = {
    isInCache,
    getFromCache,
    putStreamInCache,
};
