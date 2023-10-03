const mockNetworkCalls = require('./mockNetworkCalls');
const useContextHooks = require('./useContextHooks');

function withNetworkMocks(testFunction) {
    return function (testContext) {
        const { afterEach, beforeEach, mock } = useContextHooks(testContext);
        
        let fetchMock;
        beforeEach(() => {
            fetchMock = mockNetworkCalls(testContext);
        });
        // We inject the fetchMock as function,
        // because the variable will be set later.
        testFunction(testContext, () => fetchMock);
        afterEach(() => {
            mock.reset();
            fetchMock = undefined;
        })
    }
}

module.exports = withNetworkMocks;