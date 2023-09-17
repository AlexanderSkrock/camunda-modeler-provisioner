const { access, constants, mkdir, open, writeFile } = require('node:fs/promises');
const { homedir } = require('node:os');
const { join } = require('node:path');

const DEFAULT_CACHE_LOCATION = join(homedir(), '.cache', 'camunda-modeler');

function ensureCacheDirectory() {
    return mkdir(DEFAULT_CACHE_LOCATION, {
        recursive: true,
    }).then(() => DEFAULT_CACHE_LOCATION);
}

function isInCache(fileName) {
    return ensureCacheDirectory()
        .then((path) => access(join(path, fileName), constants.W_OK | constants.R_OK));
}

function openFromCache(fileName) {
    return ensureCacheDirectory()
        .then(cachePath => join(cachePath, fileName))
        .then(filePath => open(filePath));
}

function putStreamInCache(fileName, stream) {
    return ensureCacheDirectory()
        .then(cachePath => join(cachePath, fileName))
        .then(filePath => writeFile(filePath, stream))
        .then(() => fileName);
}

module.exports = {
    isInCache,
    openFromCache,
    putStreamInCache,
};