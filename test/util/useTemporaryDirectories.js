const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { sep } = require('node:path');

const useContextHooks = require('./useContextHooks');

function useTemporaryDirectories(testContext, count) {
    const { afterEach, beforeEach } = useContextHooks(testContext);

    const directories = [];
    beforeEach(async () => {
        const tempPaths = await Promise.all(Array.from({ length: count }, () => mkdtemp(`${tmpdir()}${sep}`)));
        directories.push(...tempPaths);
        console.log("DIR: ", directories)
    });
    afterEach(async () => {
        await Promise.all(directories.map(dir => rm(dir, { recursive: true, force: true })))
        directories.length = 0;
    });

    return directories;
}

module.exports = useTemporaryDirectories;