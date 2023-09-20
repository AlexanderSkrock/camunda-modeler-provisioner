const { join } = require('node:path');

const Config = require('./Config');
const Platform = require('../platform');

module.exports = new Config().withOverrides({
    platform: Platform.currentPlatform(),
    version: null,
    installationPath: join(process.cwd(), '.camunda-modeler'),
    linkedPlugins: [],
});
