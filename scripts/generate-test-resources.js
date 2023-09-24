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

Promise.all([
    fetch(releasesUrl).then(response => response.json()).then(json => {
        const fileName = crypto.webcrypto.randomUUID() + '.json';
        responseMapping[releasesUrl] = fileName;
        return writeFile(join(testResourcesPath, fileName), JSON.stringify(json));
    })
]).then(() => writeFile(join(testResourcesPath, "response_mappings.json"), JSON.stringify(responseMapping)));
// const latestReleaseUrl = `${releasesUrl}/latest`;
// const releaseTagsUrl = `${releasesUrl}/tags/${versionTag}`;

// release.assets[x].browser_download_url

// Assets