const releasesUrl = 'https://api.github.com/repos/camunda/camunda-modeler/releases';
const latestReleaseUrl = `${releasesUrl}/latest`
const releaseTagsUrl = `${releasesUrl}/tags`

function getAllReleases() {
    return fetch(releasesUrl).then((response) => response.json());
}

function getLatestRelease() {
    return fetch(latestReleaseUrl).then((response) => response.json());
}

function getReleaseByVersion(version) {
    return fetch(`${releaseTagsUrl}/${version}`).then((response) => response.json());
}

module.exports = {
    getAllReleases,
    getLatestRelease,
    getReleaseByVersion
}