const assert = require('node:assert');
const { access } = require('node:fs/promises');
const { describe, it } = require('node:test');
const { download } = require('../../lib');

const withNetworkMocks = require('../util/withNetworkMocks');
const useTemporaryDirectories = require('../util/useTemporaryDirectories');

describe('Download', withNetworkMocks((ctx, fetchMock) => {
    const dirs = useTemporaryDirectories(ctx, 1);

    it('should retrieve latest version', async function () {
        const downloadPath = await download({
            cachePath: dirs[0],
        });

        await assert.doesNotReject(access(downloadPath))
    })

    it('should respect configured version', async function () {
        // Only the latest version is cached within our test resources,
        // so if it fails to retrieve it can not be the latest as per default.
        await assert.rejects(download({
            cachePath: dirs[0],
            version: 'v5.15.0',
        }));
    })

    it('should use cache', async function () {
        const downloadWithCache = () => download({
            cachePath: dirs[0],
        });

        await assert.doesNotReject(downloadWithCache().then(access))
        assert.equal(fetchMock().callCount(), 2);

        await assert.doesNotReject(downloadWithCache().then(access));
        assert.equal(fetchMock().callCount(), 3);
    });

    it('should not use cache if disabled', async function () {
        const downloadWithoutCache = () => download({
            cachePath: dirs[0],
            noCache: true,
        });

        await assert.doesNotReject(downloadWithoutCache().then(access))
        assert.equal(fetchMock().callCount(), 2);

        await assert.doesNotReject(downloadWithoutCache().then(access));
        assert.equal(fetchMock().callCount(), 4);
    });
}));