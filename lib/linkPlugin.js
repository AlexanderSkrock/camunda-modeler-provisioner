const { symlink } = require('node:fs/promises');
const { basename, join } = require('node:path');

function linkPlugin (modelerPath, pluginPath) {
    const symlinkLocation = join(modelerPath, 'resources', 'plugins', basename(pluginPath));
    return symlink(pluginPath, symlinkLocation, 'junction');
}

module.exports = linkPlugin;
