const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { sep } = require('node:path');
const { afterEach, beforeEach } = require('node:test');

function withTemporaryDirectory(testFunction) {
    return function (testContext) {
        const contextBeforeEach = testContext && testContext.beforeEach ? testContext.beforeEach: beforeEach;
        const contextAfterEach = testContext && testContext.afterEach ? testContext.afterEach : afterEach;
            
        let cacheDirectory;
        contextBeforeEach(async () => {
            cacheDirectory = await mkdtemp(`${tmpdir()}${sep}`);
        });
        // We inject the cacheDirectory as function,
        // because the variable will be set later.
        testFunction(() => cacheDirectory, testContext);
        contextAfterEach(async () => {
            await rm(cacheDirectorym, { recursive: true, force: true }).then(() => cacheDirectory = undefined);
        })
    }
}

module.exports = withTemporaryDirectory;