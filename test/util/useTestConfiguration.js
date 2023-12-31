const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const useContextHooks = require('./useContextHooks');
const { Config } = require('../../lib/config');

function useTestConfiguration (testContext) {
    const { after } = useContextHooks(testContext);

    const directories = [];

    after(async () => {
        await Promise.all(directories.map(dir => rm(dir, { recursive: true, force: true })));
        directories.length = 0;
    });

    return Promise.all([
        mkdtemp(join(tmpdir(), 'cache')),
        mkdtemp(join(tmpdir(), 'installation')),
    ]).then(([cachePath, installationPath]) => {
        directories.push(cachePath, installationPath);
        return new Config().withOverrides({
            cachePath,
            installationPath,
        });
    });
}

module.exports = useTestConfiguration;
