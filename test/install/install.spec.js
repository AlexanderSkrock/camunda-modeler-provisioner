const assert = require('node:assert');
const { join } = require('node:path');
const { access } = require('node:fs/promises');
const { describe, it } = require('node:test');
const { install } = require('../../lib');

const withNetworkMocks = require('../util/withNetworkMocks');
const useDefaultTestConfiguration = require('../util/useDefaultTestConfiguration');

describe('Install', withNetworkMocks(() => {
    it('should install latest version', async function (ctx) {
        const config = useDefaultTestConfiguration(ctx);
        await assert.doesNotReject(install(config).then(access));
    });

    it('should fail to install on existing installation', async function (ctx) {
        const config = useDefaultTestConfiguration(ctx);
        await assert.doesNotReject(install(config).then(access));
        await assert.rejects(install(config));
    });

    it('should overwrite existing installation', async function (ctx) {
        const config = useDefaultTestConfiguration(ctx);
        const installWithOverride = () => install(config.withOverrides({
            overwriteExistingInstallation: true,
        }));

        await assert.doesNotReject(installWithOverride().then(access));
        await assert.doesNotReject(installWithOverride().then(access));
    });

    it('should link plugin', async function (ctx) {
        const config = useDefaultTestConfiguration(ctx);
        const installWithLinkedPlugin = () => install(config.withOverrides({
            linkedPlugins: [ join('test', 'install', 'example_plugin') ],
        }));

        await assert.doesNotReject(installWithLinkedPlugin().then(access));
        await assert.doesNotReject(access(join(config.getInstallationPath(), 'resources', 'plugins', 'example_plugin', 'index.js')));
    });

    it('should link element template', async function (ctx) {
        const config = useDefaultTestConfiguration(ctx);
        const installWithLinkedTemplate = () => install(config.withOverrides({
            linkedTemplates: [ join('test', 'install', 'example_template.json') ],
        }));

        await assert.doesNotReject(installWithLinkedTemplate().then(access));
        await assert.doesNotReject(access(join(config.getInstallationPath(), 'resources', 'element-templates', 'example_template.json')));
    });
}));
