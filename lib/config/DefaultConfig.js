const { homedir } = require('node:os');
const { join } = require('node:path');

const Config = require('./Config');
const Platform = require('../platform');

module.exports = new Config().withOverrides({
    platform: Platform.currentPlatform(),
    version: null,
    noCache: false,
    cachePath: join(homedir(), '.cache', 'camunda-modeler'),
    installationPath: join(process.cwd(), '.camunda-modeler'),
    overwriteExistingInstallation: false,
    linkedPlugins: [],
    linkedTemplates: [],
});
