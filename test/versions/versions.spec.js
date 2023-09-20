const assert = require('node:assert');
const { after, before, describe, it, mock } = require('node:test');

const { getAllVersions } = require('../../lib/versions');

describe('Versions', function () {
    describe('#getAllVersions', function () {
        before(() => {
            mock.method(global, 'fetch', () => Promise.resolve({
                status: 200,
                headers: { 'Content-type': 'application/json' },
                json: () => require('./versions_response.json'),
            }),
            );
        });
        it('should return array of version tags', async function () {
            const versions = await getAllVersions();
            assert.deepEqual(versions, [
                'v5.15.0',
                'v5.14.0',
                'v5.13.0',
                'v5.12.1',
                'v5.12.0',
                'v5.11.0',
                'v5.10.0',
                'v5.9.0',
                'v5.8.0',
                'v5.7.0',
                'v5.6.0',
                'v5.5.1',
                'v5.5.0',
                'v5.4.2',
                'v5.4.1',
                'v5.4.0',
                'v5.3.0',
                'v5.2.0',
                'v5.1.0',
                'v5.0.0',
                'v5.0.0-rc.0',
                'v5.0.0-alpha.1',
                'v5.0.0-alpha.0',
                'v4.12.0',
                'v4.12.0-rc.1',
                'v4.11.1',
                'v4.11.0',
                'v4.11.0-rc.1',
                'v4.11.0-rc.0',
                'v4.10.0',
            ]);
        });
        after(() => mock.reset());
    });
});
