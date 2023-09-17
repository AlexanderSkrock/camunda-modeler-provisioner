const downloadCamundaModeler = require('./download');

function installCamundaModeler (os, version) {
    return downloadCamundaModeler(os, version);
};

module.exports = installCamundaModeler;
