const { async: AsyncZip } = require('node-stream-zip');

const downloadCamundaModeler = require('./download');
const { resolve, basename } = require('node:path');
const { symlink } = require('node:fs/promises');

function extractTo (zipPath, targetPath) {
    const zip = new AsyncZip({ file: zipPath });
    return zip.extract(null, targetPath);
}

function linkPlugin (installationPath, pluginPath) {
    const pluginInstallationPath = resolve(installationPath, 'resources', 'plugins', basename(pluginPath));
    return symlink(pluginPath, pluginInstallationPath, 'junction');
}

function installCamundaModeler (config) {
    return downloadCamundaModeler(config)
        .then(zipPath => extractTo(zipPath, config.getInstallationPath()))
        .then(() => Promise.all(config.getLinkedPlugins().map(pluginPath => linkPlugin(config.getInstallationPath(), pluginPath))))
        .then(() => config.getInstallationPath());
}

module.exports = installCamundaModeler;
