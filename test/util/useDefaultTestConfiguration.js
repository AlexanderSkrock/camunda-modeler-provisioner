const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { sep } = require('node:path');

const useContextHooks = require('./useContextHooks');
const { Config } = require('../../lib/config');

function useDefaultTestConfiguration (testContext) {
    const { after, before } = useContextHooks(testContext);

    const config = new Config();

    before(async () => {
        config.cachePath = await mkdtemp(`${tmpdir()}${sep}`);
        config.installationPath = await mkdtemp(`${tmpdir()}${sep}`);
    })

    after(async () => {
        await rm(config.getCachePath(), { recursive: true, force: true });
        await rm(config.getInstallationPath(), { recursive: true, force: true });
    });

    return config;
}

module.exports = useDefaultTestConfiguration;
