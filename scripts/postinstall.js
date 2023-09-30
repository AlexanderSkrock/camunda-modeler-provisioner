/**
 * This file is part of public API.
 *
 * The `camunda-modeler-provisioner` package runs this script during the installation process.
 */
function getInstaller() {
    return new Promise((resolve) => {
        const { install } = require('camunda-modeler-provisioner');
        resolve(install);
    });
}

getInstaller().catch(error => {
    console.warn(error);
    console.warn('Skipping Camunda Modeler installation because the camunda-modeler-provisioner build is not available. Run `npm install` again after you have re-built camunda-modeler-provisioner.');
    process.exit(0);
}).then(installer => {
    installer();
}).catch(error => console.warn('Camunda Modeler installation failed', error));