const { access, copyFile, cp, link, mkdir, symlink, readdir, rm } = require('node:fs/promises');
const { join, resolve, basename } = require('node:path');

const FileType = require('file-type');
const { async: AsyncZip } = require('node-stream-zip');
const tar = require('tar');

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
    return FileType.fromFile(zipPath).then(fileType => {
        if (fileType.mime) {
            if (fileType.mime === 'application/zip') {
                const zip = new AsyncZip({ file: zipPath });
                return zip.extract(null, targetPath).then(() => zip.close());
            } else if (fileType.mime === 'application/gzip') {
                return tar.extract({ file: zipPath, cwd: targetPath, strip: 1 });
            }
        }
        throw new Error(`Unsupported archive: "${zipPath}"`);
    });
}

function linkPlugin (installationPath, pluginPath) {
    const pluginsPath = resolve(installationPath, 'resources', 'plugins');
    return mkdir(pluginsPath, { recursive: true }).then(() => {
        info(`Linking plugin "${basename(pluginPath)}" at path ${pluginPath}`);
        // We use the junction type to avoid the need of extra permissions
        const pluginInstallationPath = join(pluginsPath, basename(pluginPath));
        return symlink(pluginPath, pluginInstallationPath, 'junction').catch(err => {
            info(`Linking failed with error: ${err}`);
            info(`Fallback: Copying plugin "${basename(pluginPath)}" from path ${pluginPath}`);
            return cp(pluginPath, pluginInstallationPath, { recursive: true });
        });
    });
}

function linkTemplate (installationPath, templatePath) {
    const templatesPath = resolve(installationPath, 'resources', 'element-templates');
    return mkdir(templatesPath, { recursive: true }).then(() => {
        info(`Linking templates at path ${templatePath}`);
        // We need to hard link because symlinks on files need extra permissions (at least on Windows)
        const templateInstallationPath = join(templatesPath, basename(templatePath));
        return link(templatePath, templateInstallationPath, 'file').catch(err => {
            info(`Linking failed with error: ${err}`);
            info(`Fallback: Copying template from path ${templatePath}`);
            return copyFile(templatePath, templateInstallationPath);
        });
    });
}

function installCamundaModeler (config) {
    info(`Ìnstalling for platform "${config.getPlatform().getDisplayName()}"`);
    return checkExistingInstallation(config.getInstallationPath(), config.shouldOverwriteExistingInstallation())
        .then(() => downloadCamundaModeler(config))
        .then(zipPath => extractTo(zipPath, config.getInstallationPath()))
        .then(() => Promise.all(config.getLinkedPlugins().map(pluginPath => linkPlugin(config.getInstallationPath(), pluginPath))))
        .then(() => Promise.all(config.getLinkedTemplates().map(templatePath => linkTemplate(config.getInstallationPath(), templatePath))))
        .then(() => config.getInstallationPath());
}

module.exports = installCamundaModeler;
