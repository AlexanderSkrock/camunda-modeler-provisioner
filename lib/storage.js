const { access, constants, mkdir, writeFile } = require('node:fs/promises');
const { homedir } = require('node:os');
const { basename, join } = require('node:path');

const DEFAULT_CACHE_LOCATION = join(homedir(), '.cache', 'camunda-modeler');

function ensureCacheDirectory() {
    return mkdir(DEFAULT_CACHE_LOCATION, {
        recursive: true,
    });
}

function isInCache(fileName) {
    return access(join(DEFAULT_CACHE_LOCATION, fileName), constants.W_OK | constants.R_OK);
}

function download(url) {
    const fileName = basename(url);
    const destination = join(DEFAULT_CACHE_LOCATION, fileName);
    return ensureCacheDirectory()
    .then(() => isInCache(fileName))
    .catch(() => fetch(url).then(response => {
        if (!response.ok) {
            return new Error('Response status was ' + response.status);
        }
        return writeFile(destination, response.body)
    }));
}

module.exports = {
    download,
};