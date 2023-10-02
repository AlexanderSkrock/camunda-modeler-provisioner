const { afterEach, beforeEach, mock } = require('node:test');
const mockNetworkCalls = require('./mockNetworkCalls')

function withNetworkMocks(testFunction) {
    return function (testContext) {
        const contextBeforeEach = testContext && testContext.beforeEach ? testContext.beforeEach: beforeEach;
        const contextAfterEach = testContext && testContext.afterEach ? testContext.afterEach : afterEach;
        const contextMock = testContext && testContext.mock ? testContext.mock : mock;
            
        let fetchMock;
        contextBeforeEach(() => {
            fetchMock = mockNetworkCalls(testContext);
        });
        // We inject the fetchMock as function,
        // because the variable will be set later.
        testFunction(() => fetchMock, testContext);
        contextAfterEach(() => {
            contextMock.reset();
            fetchMock = undefined;
        })
    }
}

module.exports = withNetworkMocks;