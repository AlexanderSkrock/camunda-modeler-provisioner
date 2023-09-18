const { async: AsyncZip } = require('node-stream-zip');

const downloadCamundaModeler = require('./download');

function installCamundaModeler (os, version, installationPath) {
    return downloadCamundaModeler(os, version)
        .then(filePath => new AsyncZip({ file: filePath }))
        .then(archive => archive.extract(null, installationPath));
}

module.exports = installCamundaModeler;
