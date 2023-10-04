const assert = require('node:assert');
const { access } = require('node:fs/promises');
const { describe, it } = require('node:test');
const { download } = require('../../lib');

const withNetworkMocks = require('../util/withNetworkMocks');
const useDefaultTestConfiguration = require('../util/useTestConfiguration');

describe('Download', withNetworkMocks((ctx, fetchMock) => {
    it('should retrieve latest version', async function () {
        await assert.doesNotReject(useDefaultTestConfiguration(ctx).then(download).then(access));
    });

    it('should respect configured version', async function () {
        // Only the latest version is cached within our test resources,
        // so if it fails to retrieve it can not be the latest as per default.
        await assert.rejects(useDefaultTestConfiguration(ctx).then(config => config.withOverrides({
            version: 'v5.15.0',
        })).then(download));
    });

    it('should use cache', async function () {
        const configWithCache = useDefaultTestConfiguration(ctx);

        await assert.doesNotReject(configWithCache.then(download).then(access));
        assert.equal(fetchMock().callCount(), 2);

        await assert.doesNotReject(configWithCache.then(download).then(access));
        assert.equal(fetchMock().callCount(), 3);
    });

    it('should not use cache if disabled', async function () {
        const configWithoutCache = useDefaultTestConfiguration(ctx).then(config => config.withOverrides({
            noCache: true,
        }));

        await assert.doesNotReject(configWithoutCache.then(download).then(access));
        assert.equal(fetchMock().callCount(), 2);

        await assert.doesNotReject(configWithoutCache.then(download).then(access));
        assert.equal(fetchMock().callCount(), 4);
    });
}));
