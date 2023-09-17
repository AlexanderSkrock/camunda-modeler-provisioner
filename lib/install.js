const { getReleaseByVersion, getLatestRelease } = require('./api');
const { download } = require('./storage');

function getDownloadLink (os, version) {
    const release = version === null || version === undefined
        ? getLatestRelease()
        : getReleaseByVersion(version);

    return release.then(release => {
        if (!release || !release.assets) {
            return null;
        }
        const asset = release.assets.find(asset => asset.name.includes(os));
        return asset && asset.browser_download_url;
    });
}

function installCamundaModeler (os, version) {
    return getDownloadLink(os, version).then(link => {
        if (!link) {
            throw new Error('no viable download resource found');
        }
        return download(link);
    });
};

module.exports = installCamundaModeler;
