const { access, cp, cpFile, link, symlink, readdir, rm } = require('node:fs/promises');
const { resolve, basename } = require('node:path');

const { async: AsyncZip } = require('node-stream-zip');

const downloadCamundaModeler = require('./download');
const { info } = require('./logging');

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
    info(`Extracting "${zipPath}" to "${targetPath}"`);
    const zip = new AsyncZip({ file: zipPath });
    return zip.extract(null, targetPath).then(() => zip.close());
}

function linkPlugin (installationPath, pluginPath) {
    const pluginInstallationPath = resolve(installationPath, 'resources', 'plugins', basename(pluginPath));
    info(`Linking plugin "${basename(pluginPath)}" at path ${pluginPath}`)
    // We use the junction type to avoid the need of extra permissions
    return symlink(pluginPath, pluginInstallationPath, 'junction').catch(err => {
      info(`Linking failed with error: ${err}`)
      info(`Fallback: Copying plugin "${basename(pluginPath)}" from path ${pluginPath}`)
      return cp(pluginPath, pluginInstallationPath, { recursive: true })
    });
}

function linkTemplate (installationPath, templatePath) {
    const templateInstallationPath = resolve(installationPath, 'resources', 'element-templates', basename(templatePath));
  info(`Linking templates at path ${templatePath}`)
    // We need to hard link because symlinks on files need extra permissions (at least on Windows)
    return link(templatePath, templateInstallationPath, 'file').catch(err => {
      info(`Linking failed with error: ${err}`)
      info(`Fallback: Copying template from path ${templatePath}`)
      return cpFile(templatePath, templateInstallationPath)
    });
}

function installCamundaModeler (config) {
    info(`Ìnstalling for platform "${config.getPlatform().getShortName()}"`);
    return checkExistingInstallation(config.getInstallationPath(), config.shouldOverwriteExistingInstallation())
        .then(() => downloadCamundaModeler(config))
        .then(zipPath => extractTo(zipPath, config.getInstallationPath()))
        .then(() => Promise.all(config.getLinkedPlugins().map(pluginPath => linkPlugin(config.getInstallationPath(), pluginPath))))
        .then(() => Promise.all(config.getLinkedTemplates().map(templatePath => linkTemplate(config.getInstallationPath(), templatePath))))
        .then(() => config.getInstallationPath());
}

module.exports = installCamundaModeler;
