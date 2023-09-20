const assert = require('node:assert');
const { isAbsolute } = require('node:path');
const { describe, it } = require('node:test');

const { getConfig, overrideConfig, Config } = require('../../lib/config');
const { currentPlatform, Platform } = require('../../lib/platform');

describe('Config', function () {
    describe('#getConfig', function () {
        it('should load default config', function () {
            const config = getConfig();
            assert.equal(config.getPlatform(), currentPlatform());
            assert.equal(config.getVersion(), null);
            assert.ok(config.getLinkedPlugins());
            assert.equal(config.getLinkedPlugins().length, 0);
        });
        it('should respect overrides', function () {
            overrideConfig({
                linkedPlugins: ['.'],
            });
            const customConfig = getConfig();

            assert.equal(customConfig.getPlatform(), currentPlatform());
            assert.equal(customConfig.getVersion(), null);
            assert.ok(customConfig.getLinkedPlugins());
            assert.equal(customConfig.getLinkedPlugins().length, 0);
        });
    });
    describe('Config', function () {
        it('withOverrides does not mutate itself', function () {
            const config = new Config();
            // Just for sanity’s sake
            assert.equal(config.__KEY__, undefined);

            const changedConfig = config.withOverrides({ __KEY__: '__VALUE__' });

            assert.ok(config !== changedConfig);
            assert.equal(config.__KEY__, undefined);
            assert.equal(changedConfig.__KEY__, '__VALUE__');
        });

        it('getPlatform supports process platform', function () {
            const config = new Config().withOverrides({ platform: 'darwin' });
            assert.ok(config.getPlatform() instanceof Platform);
        });
        it('getPlatform supports short names', function () {
            const config = new Config().withOverrides({ platform: 'mac' });
            assert.ok(config.getPlatform() instanceof Platform);
        });
        it('getInstallationPath always returns an absolute path', function () {
            const config = new Config().withOverrides({ installationPath: '.' });
            assert.ok(isAbsolute(config.getInstallationPath()));
        });
        it('getLinkedPlugins returns an empty array if not set', function () {
            const config = new Config();
            assert.deepEqual(config.getLinkedPlugins(), []);
        });
        it('getLinkedPlugins always returns absolute paths', function () {
            const config = new Config().withOverrides({ linkedPlugins: ['.'] });
            config.getLinkedPlugins().forEach(pluginPath => assert.ok(isAbsolute(pluginPath)));
        });
    });
});
