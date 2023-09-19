const { execFile } = require('node:child_process');
const { resolve } = require('node:path');
const { access, constants } = require('node:fs/promises');

function launch (platform, path) {
    const executableFilePath = platform.getExecutablePath();
    if (!executableFilePath) {
        return Promise.reject(new Error(`Unsupported platform: ${platform}`));
    }
    const absExecFilePath = resolve(path, executableFilePath);
    return access(absExecFilePath, constants.X_OK).then(() => new Promise((resolve, reject) => {
        execFile(absExecFilePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

module.exports = launch;
