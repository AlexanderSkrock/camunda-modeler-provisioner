function getCurrentOS() {
    switch(process.platform) {
        case 'win32':
            return 'win';
        case 'darwin':
            return 'mac';
        case 'linux':
            return 'linux';
        default:
            return undefined;
    }
}

module.exports = {
    getCurrentOS
};