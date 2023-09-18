const { exec, execFile, execFileSync } = require('node:child_process');
const { join } = require('node:path');
const { access, constants } = require('node:fs/promises');

function getFileToExecute (os) {
    switch (os) {
    case 'win':
        return 'Camunda Modeler.exe';
    case 'linux':
        return 'Camunda Modeler';
    default:
        return undefined;
    }
}
function launch (os, path) {
    const executableFile = getFileToExecute(os, path);
    if (!executableFile) {
        return Promise.reject(new Error(`Unsupported os: ${os}`));
    }
    const executableFilePath = join(path, executableFile);
    return access(executableFilePath, constants.X_OK).then(() => new Promise((resolve, reject) => {
        execFile(executableFilePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

module.exports = launch;
