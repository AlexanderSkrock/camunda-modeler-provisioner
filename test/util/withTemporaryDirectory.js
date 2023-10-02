const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { sep } = require('node:path');

function withTemporaryDirectory(testFunction) {
    return function (testContext) {
        const { afterEach, beforeEach } = useContextHooks(testContext);
                
        let cacheDirectory;
        beforeEach(async () => {
            cacheDirectory = await mkdtemp(`${tmpdir()}${sep}`);
        });
        // We inject the cacheDirectory as function,
        // because the variable will be set later.
        testFunction(() => cacheDirectory, testContext);
        afterEach(async () => {
            await rm(cacheDirectorym, { recursive: true, force: true }).then(() => cacheDirectory = undefined);
        })
    }
}

module.exports = withTemporaryDirectory;