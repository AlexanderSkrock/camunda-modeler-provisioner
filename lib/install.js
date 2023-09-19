const { async: AsyncZip } = require('node-stream-zip');

const downloadCamundaModeler = require('./download');
const linkPlugin = require('./linkPlugin');

function extractTo (zipPath, targetPath) {
    const zip = new AsyncZip({ file: zipPath });
    return zip.extract(null, targetPath);
}

function installCamundaModeler (os, version, installationPath, linkedPluginPath) {
    return downloadCamundaModeler(os, version)
        .then(zipPath => extractTo(zipPath, installationPath))
        .then(() => linkPlugin(installationPath, linkedPluginPath));
}

module.exports = installCamundaModeler;
