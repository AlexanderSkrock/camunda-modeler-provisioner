const assert = require('node:assert');
const { access } = require('node:fs/promises');
const { describe, it } = require('node:test');
const { download, install } = require('../../lib');

const withNetworkMocks = require('../util/withNetworkMocks');
const useDefaultTestConfiguration = require('../util/useDefaultTestConfiguration');

describe('Install', withNetworkMocks((ctx, fetchMock) => {
    const config = useDefaultTestConfiguration(ctx, 1);

    it('should install latest version', async function () {
        await assert.doesNotReject(install(config).then(access));
    });

    it('should fail to install on existing installation', async function () {
        await assert.doesNotReject(install(config).then(access));
        await assert.rejects(install(config));
    });

    it('should overwrite existing installation', async function () {
        const installWithOverride = () => install(config.withOverrides({
            overwriteExistingInstallation: true,
        }));

        await assert.doesNotReject(installWithOverride().then(access));
        await assert.doesNotReject(installWithOverride().then(access));
    });

    /*
     * TODO
     * Testcase for linking plugins and element templates
     */
}));
