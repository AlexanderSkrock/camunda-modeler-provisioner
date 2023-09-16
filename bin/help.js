/**
 * Print a help text.
 *
 * @param {stream.Writable} output - A writable stream to print.
 * @returns {Promise} Always a fulfilled promise.
 * @private
 */
module.exports = function printVersion (output) {
    output.write('not yet available');

    return Promise.resolve(null);
};
