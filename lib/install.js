const { async: AsyncZip } = require('node-stream-zip');

const downloadCamundaModeler = require('./download');
const { resolve, basename } = require('node:path');
const { access, symlink, readdir, rm } = require('node:fs/promises');

function checkExistingInstallation (installationPath, cleanIfExists) {
    return access(installationPath)
        .then(() => readdir(installationPath))
        .catch(() => [])
        .then(files => {
            if (files && files.length > 0) {
                if (cleanIfExists) {
                    return rm(installationPath, { recursive: true, force: true });
                } else {
                    throw new Error(`Installation directory exists and is not empty: ${installationPath}`);
                }
            }
        });
}

function extractTo (zipPath, targetPath) {
    const zip = new AsyncZip({ file: zipPath });
    return zip.extract(null, targetPath);
}

function linkPlugin (installationPath, pluginPath) {
    const pluginInstallationPath = resolve(installationPath, 'resources', 'plugins', basename(pluginPath));
    return symlink(pluginPath, pluginInstallationPath, 'junction');
}

function installCamundaModeler (config) {
    return checkExistingInstallation(config.getInstallationPath(), config.shouldOverwriteExistingInstallation())
        .then(() => downloadCamundaModeler(config))
        .then(zipPath => extractTo(zipPath, config.getInstallationPath()))
        .then(() => Promise.all(config.getLinkedPlugins().map(pluginPath => linkPlugin(config.getInstallationPath(), pluginPath))))
        .then(() => config.getInstallationPath());
}

module.exports = installCamundaModeler;
