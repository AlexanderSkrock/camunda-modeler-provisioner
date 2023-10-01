const { afterEach, beforeEach, mock } = require('node:test');
const mockNetworkCalls = require('./mockNetworkCalls')

function withNetworkMocks(testFunction) {
    return function (testContext) {
        const contextBeforeEach = testContext && testContext.beforeEach ? testContext.beforeEach: beforeEach;
        const contextAfterEach = testContext && testContext.afterEach ? testContext.afterEach : afterEach;
        const contextMock = testContext && testContext.mock ? testContext.mock : mock;
            
        contextBeforeEach(() => {
            mockNetworkCalls(testContext);
        });
        testFunction(testContext);
        contextAfterEach(() => {
            contextMock.reset();
        })
    }
}

module.exports = withNetworkMocks;