const { basename } = require('node:path');

const { getReleaseByVersion, getLatestRelease } = require('./api');
const { isInCache, putStreamInCache, getFromCache } = require('./cache');

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

function ensureIsInCache (link) {
    const fileName = basename(link);
    return isInCache(fileName)
        .then(() => fileName)
        .catch(() => {
            return fetch(link).then(response => {
                if (!response.ok) {
                    return new Error('Response status was ' + response.status);
                }
                return putStreamInCache(fileName, response.body);
            });
        });
}

function downloadCamundaModeler (config) {
    return getDownloadLink(config.getPlatform(), config.getVersion())
        .then(link => ensureIsInCache(link))
        .then(cacheKey => getFromCache(cacheKey));
}

module.exports = downloadCamundaModeler;
