const { mkdirSync } = require('node:fs');
const { access, constants, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

class Cache {
    constructor (cachePath) {
        if (!cachePath) {
            throw new Error('no cache path defined');
        }
        this.cachePath = cachePath;
        mkdirSync(this.cachePath, { recursive: true });
    }

    isCached (cacheKey) {
        const cachedFile = this.getCachedFilePath(cacheKey);
        return access(cachedFile, constants.W_OK | constants.R_OK);
    }

    get (cacheKey) {
        return this.isCached(cacheKey).then(() => this.getCachedFilePath(cacheKey)).catch((originalError) => {
            throw new Error(`Cache entry could not be retrieved for key: ${cacheKey}`, { originalError });
        });
    }

    put (cacheKey, data) {
        const cachedFile = this.getCachedFilePath(cacheKey);
        return writeFile(cachedFile, data);
    }

    getCachedFilePath (cacheKey) {
        return join(this.cachePath, cacheKey);
    }
}

module.exports = Cache;
