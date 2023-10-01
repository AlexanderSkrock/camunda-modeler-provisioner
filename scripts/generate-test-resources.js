const crypto = require('node:crypto');
const { accessSync, constants, mkdirSync } = require('node:fs');
const { writeFile } = require('node:fs/promises');
const { extname, join } = require('node:path');

const testResourcesPath = join(process.cwd(), 'test-resources');

try {
    accessSync(testResourcesPath, constants.W_OK | constants.R_OK)
} catch (error) {
    mkdirSync(testResourcesPath);
}

const responseMapping = {};
function fetchAndRemember(resource, options) {
    return fetch(resource, options).then(response => {
        responseMapping[resource] = response;
        return response;
    })
}

const releasesUrl = 'https://api.github.com/repos/camunda/camunda-modeler/releases';
const latestReleaseUrl = `${releasesUrl}/latest`;
const taggedReleaseUrl = tag => `${releasesUrl}/tags/${tag}`;

Promise.all([
    fetchAndRemember(releasesUrl),
    fetch(releasesUrl).then(response => response.json()).then(releases => {
        return Promise.all(releases.map(r => fetchAndRemember(taggedReleaseUrl(r.name))));
    }),
    fetchAndRemember(latestReleaseUrl),
    fetch(latestReleaseUrl).then(response => response.json()).then(latestRelease => {
        return Promise.all(latestRelease.assets.map(asset => fetchAndRemember(asset.browser_download_url)));
    })
]).then(() => {
    const responseJson = {}
    return Promise.all(Object.entries(responseMapping).map(([url, response]) => {
        const dataPath = join(testResourcesPath, crypto.webcrypto.randomUUID());

        responseJson[url] = {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers: [...response.headers.entries()].reduce((result, [k, v]) => ({ ...result, [k]: v }), {}),
            dataPath,
        };

        return writeFile(dataPath, response.body);
    })).then(() => writeFile(join(testResourcesPath, "response_mappings.json"), JSON.stringify(responseJson)));
});