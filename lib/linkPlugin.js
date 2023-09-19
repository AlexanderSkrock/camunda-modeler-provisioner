const { symlink } = require('node:fs/promises');
const { basename, resolve } = require('node:path');

function linkPlugin (modelerPath, pluginPath) {
    const pluginInstallationPath = resolve(modelerPath, 'resources', 'plugins', basename(pluginPath));
    return symlink(pluginPath, pluginInstallationPath, 'junction');
}

module.exports = linkPlugin;
