const { basename } = require('node:path');

const { getReleaseByVersion, getLatestRelease } = require('./api');
const Cache = require('./cache');

function getDownloadLink (platform, version) {
    const release = version === null || version === undefined
        ? getLatestRelease()
        : getReleaseByVersion(version);

    return release.then(release => {
        if (!release || !release.assets) {
            return null;
        }
        const asset = release.assets.find(asset => asset.name.includes(platform.getShortName()));
        return asset && asset.browser_download_url;
    });
}

function downloadToCache (cache, cacheKey, link) {
    return fetch(link).then(response => {
        if (!response.ok) {
            return new Error('Response status was ' + response.status);
        }
        return cache.put(cacheKey, response.body);
    });
}

function downloadCamundaModeler (config) {
    const cache = new Cache(config.getCachePath());
    return getDownloadLink(config.getPlatform(), config.getVersion()).then(link => {
        const fileName = basename(link);

        return Promise.all([
            cache.isCached(fileName),
            config.shouldSkipCache() ? Promise.reject() : Promise.resolve()
        ]).catch(() => downloadToCache(cache, fileName, link))
          .then(() => cache.get(fileName));
    });
}

module.exports = downloadCamundaModeler;
