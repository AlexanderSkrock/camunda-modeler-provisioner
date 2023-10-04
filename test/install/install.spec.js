const assert = require('node:assert');
const { join } = require('node:path');
const { access } = require('node:fs/promises');
const { describe, it } = require('node:test');
const { install } = require('../../lib');

const withNetworkMocks = require('../util/withNetworkMocks');
const useTestConfiguration = require('../util/useTestConfiguration');

describe('Install', withNetworkMocks(() => {
    it('should install latest version', async function (ctx) {
        await assert.doesNotReject(useTestConfiguration(ctx).then(install).then(access));
    });

    it('should fail to install on existing installation', async function (ctx) {
        const config = await useTestConfiguration(ctx);
        await assert.doesNotReject(install(config).then(access));
        await assert.rejects(install(config));
    });

    it('should overwrite existing installation', async function (ctx) {
        const withOverrideConfig = useTestConfiguration(ctx).then(config => config.withOverrides({
            overwriteExistingInstallation: true,
        }));

        await assert.doesNotReject(withOverrideConfig.then(install).then(access));
        await assert.doesNotReject(withOverrideConfig.then(install).then(access));
    });

    it('should link plugin', async function (ctx) {
        const withLinkedPluginConfig = await useTestConfiguration(ctx).then(config => config.withOverrides({
            linkedPlugins: [join('test', 'install', 'example_plugin')],
        }));

        await assert.doesNotReject(install(withLinkedPluginConfig).then(access));
        await assert.doesNotReject(access(join(withLinkedPluginConfig.getInstallationPath(), 'resources', 'plugins', 'example_plugin', 'index.js')));
    });

    it('should link element template', async function (ctx) {
        const withLinkedTemplateConfig = await useTestConfiguration(ctx).then(config => config.withOverrides({
            linkedTemplates: [join('test', 'install', 'example_template.json')],
        }));

        await assert.doesNotReject(install(withLinkedTemplateConfig).then(access));
        await assert.doesNotReject(access(join(withLinkedTemplateConfig.getInstallationPath(), 'resources', 'element-templates', 'example_template.json')));
    });
}));
