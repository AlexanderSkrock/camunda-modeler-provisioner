require('./Platform');
const Linux = require('./Linux');
const Mac = require('./Mac');
const Windows = require('./Windows');

const linuxPlatform = new Linux();
const macPlatform = new Mac();
const windowsPlatform = new Windows();

const allPlatforms = [linuxPlatform, windowsPlatform, macPlatform];

function currentPlatform () {
    return ofProcessPlatform(process.platform);
}

function ofProcessPlatform (processPlatform) {
    return allPlatforms.find(platform => platform.getProcessPlatforms().includes(processPlatform));
}

module.exports = {
    currentPlatform,
    ofProcessPlatform,
    Linux: linuxPlatform,
    Mac: macPlatform,
    Windows: windowsPlatform,
};
