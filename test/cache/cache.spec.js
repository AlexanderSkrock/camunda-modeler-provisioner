const assert = require('node:assert');
const { access, mkdtemp, readFile } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { dirname, join } = require('node:path');
const { beforeEach, describe, it } = require('node:test');

const Cache = require('../../lib/cache');

describe('Cache', function () {
    let cacheDirectory;
    let cache;

    beforeEach(async () => {
        cacheDirectory = await mkdtemp(join(tmpdir(), 'cache'));
        cache = new Cache(cacheDirectory);
    });

    it('Cache respects cache directory', async function () {
        await cache.put('KEY', 'DATA');
        const cachedDataPath = await cache.get('KEY');
        assert.equal(cacheDirectory, dirname(cachedDataPath));
    });

    it('isCached should succeed on existing cache entry', async function () {
        await cache.put('KEY', 'DATA');
        await assert.doesNotReject(cache.isCached('KEY'));
    });

    it('isCached should fail on missing cache entry', async function () {
        await cache.put('KEY', 'DATA');
        await assert.rejects(cache.isCached('UNKNOWN_KEY'));
    });

    it('get should return the path to the cache entry', async function () {
        await cache.put('KEY', 'DATA');
        const cachedDataPath = await cache.get('KEY');
        await assert.doesNotReject(access(cachedDataPath));
    });

    it('Put should insert cache entry', async function () {
        await cache.put('KEY', 'DATA');
        const cachedData = await cache.get('KEY').then(readFile);
        assert.deepEqual(Buffer.from('DATA'), cachedData);
    });

    it('Put should override existing cache entry', async function () {
        await cache.put('KEY', 'DATA');
        await cache.put('KEY', 'DATA_NEW');
        const cachedData = await cache.get('KEY').then(readFile);
        assert.deepEqual(Buffer.from('DATA_NEW'), cachedData);
    });
});
