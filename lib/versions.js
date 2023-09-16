const releasesUrl = 'https://api.github.com/repos/camunda/camunda-modeler/releases';

function getReleases() {
    return fetch(releasesUrl).then((response) => response.json());
}

function getVersions() {
    return getReleases().then(releases => releases.map(release => release.name));
};

module.exports = getVersions;
