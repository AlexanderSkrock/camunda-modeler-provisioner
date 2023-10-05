const assert = require('node:assert');
const { join } = require('node:path');
const { access } = require('node:fs/promises');
const { statSync } = require('node:fs');
const { describe, it } = require('node:test');
const { install } = require('../../lib');

const withNetworkMocks = require('../util/withNetworkMocks');
const useTestConfiguration = require('../util/useTestConfiguration');
const { info } = require('../../lib/logging');

describe('Install', withNetworkMocks((ctx) => {
    it('should retrieve correct stats', function () {
        info('Stats of the test resources: ' + JSON.stringify(statSync('test-resources')));
        Object.entries(require('../../test-resources/response_mappings.json')).forEach(([url, response]) => {
            info(`Stats of the body for "${url}": ${JSON.stringify(statSync(join('test-resources', response.body)))}`);
        });
    });

    it('should install latest version', async function () {
        await assert.doesNotReject(useTestConfiguration(ctx).then(install).then(access));
    });

    it('should fail to install on existing installation', async function () {
        const config = await useTestConfiguration(ctx);
        await assert.doesNotReject(install(config).then(access));
        await assert.rejects(install(config));
    });

    it('should overwrite existing installation', async function () {
        const withOverrideConfig = useTestConfiguration(ctx).then(config => config.withOverrides({
            overwriteExistingInstallation: true,
        }));

        await assert.doesNotReject(withOverrideConfig.then(install).then(access));
        await assert.doesNotReject(withOverrideConfig.then(install).then(access));
    });

    it('should link plugin', async function () {
        const withLinkedPluginConfig = await useTestConfiguration(ctx).then(config => config.withOverrides({
            linkedPlugins: [join('test', 'install', 'example_plugin')],
        }));

        await assert.doesNotReject(install(withLinkedPluginConfig).then(access));
        await assert.doesNotReject(access(join(withLinkedPluginConfig.getInstallationPath(), 'resources', 'plugins', 'example_plugin', 'index.js')));
    });

    it('should link element template', async function () {
        const withLinkedTemplateConfig = await useTestConfiguration(ctx).then(config => config.withOverrides({
            linkedTemplates: [join('test', 'install', 'example_template.json')],
        }));

        await assert.doesNotReject(install(withLinkedTemplateConfig).then(access));
        await assert.doesNotReject(access(join(withLinkedTemplateConfig.getInstallationPath(), 'resources', 'element-templates', 'example_template.json')));
    });
}));
