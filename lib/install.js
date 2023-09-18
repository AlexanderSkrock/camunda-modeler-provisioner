const unzipper = require('unzipper');

const downloadCamundaModeler = require('./download');

function installCamundaModeler (os, version, path) {
    return downloadCamundaModeler(os, version).then(fileHandle => {
        fileHandle.createReadStream().pipe(unzipper.Extract({ path }));
    });
}

module.exports = installCamundaModeler;
