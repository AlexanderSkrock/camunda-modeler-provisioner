const { async: AsyncZip } = require('node-stream-zip');

const downloadCamundaModeler = require('./download');
const linkPlugin = require('./linkPlugin');

function installCamundaModeler (os, version, installationPath, linkedPluginPath) {
    return downloadCamundaModeler(os, version)
        .then(filePath => new AsyncZip({ file: filePath }))
        .then(archive => archive.extract(null, installationPath))
        .then(() => linkPlugin(installationPath, linkedPluginPath));
}

module.exports = installCamundaModeler;
