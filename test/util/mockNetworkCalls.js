const { readFile } = require('node:fs/promises');
const { join, resolve } = require('node:path');
const { mock: globalMock } = require('node:test');

function mockNetworkCalls (testContext) {
    const mockObject = testContext.mock ? testContext.mock : globalMock;

    const testResourcesPath = resolve(__dirname, '..', '..', 'test-resources');
    const responseMappings = require(join(testResourcesPath, 'response_mappings.json'));
    const proxy = mockObject.method(global, 'fetch', (resource) => {
        const mapping = responseMappings[resource];
        if (!mapping) {
            return Promise.resolve(new Response(undefined, {
                status: 404,
                statusText: 'Not Found',
            }));
        }
        return readFile(join(testResourcesPath, mapping.body)).then(body => new Response(body, mapping));
    });
    return proxy.mock;
}

module.exports = mockNetworkCalls;
