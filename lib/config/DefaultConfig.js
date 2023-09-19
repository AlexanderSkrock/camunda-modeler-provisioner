const Config = require('./Config');
const Platform = require('../platform');

module.exports = new Config().withOverrides({
    platform: Platform.currentPlatform(),
    linkedPlugins: [],
});
