const { getAllReleases } = require('./api');

function getAllVersions () {
    return getAllReleases().then(releases => releases.map(release => release.name));
};

module.exports = {
    getAllVersions,
};
