const crypto = require('node:crypto');
const { accessSync, constants, mkdirSync } = require('node:fs');
const { writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const testResourcesPath = join(process.cwd(), 'test-resources');

try {
    accessSync(testResourcesPath, constants.W_OK | constants.R_OK)
} catch (error) {
    mkdirSync(testResourcesPath);
}

const responseMapping = {};

const releasesUrl = 'https://api.github.com/repos/camunda/camunda-modeler/releases';
const latestReleaseUrl = `${releasesUrl}/latest`;
const taggedReleaseUrl = tag => `${releasesUrl}/tags/${tag}`;

Promise.all([
    fetch(releasesUrl).then(response => response.json()).then(releases => {
        const fileName = crypto.webcrypto.randomUUID() + '.json';
        responseMapping[releasesUrl] = fileName;
        return Promise.all([
            writeFile(join(testResourcesPath, fileName), JSON.stringify(releases)),
            ...releases.map(r => fetch(taggedReleaseUrl(r.name)).then(response => response.json()).then(release => {
                const fileName = crypto.webcrypto.randomUUID() + '.json';
                responseMapping[taggedReleaseUrl(r.name)] = fileName;
                return writeFile(join(testResourcesPath, fileName), JSON.stringify(release));
            }))
        ]);
    }),
    fetch(latestReleaseUrl).then(response => response.json()).then(latestRelease => {
        const fileName = crypto.webcrypto.randomUUID() + '.json';
        responseMapping[latestReleaseUrl] = fileName;
        return Promise.all([
            writeFile(join(testResourcesPath, fileName), JSON.stringify(latestRelease)),
            ...latestRelease.assets.map(asset => fetch(asset.browser_download_url).then(response => {
                const fileName = crypto.webcrypto.randomUUID();
                responseMapping[asset.browser_download_url] = fileName;
                return writeFile(join(testResourcesPath, fileName), response.body);
            }))
        ]);
    })
]).then(() => writeFile(join(testResourcesPath, "response_mappings.json"), JSON.stringify(responseMapping)));