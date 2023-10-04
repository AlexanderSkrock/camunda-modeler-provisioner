const { after, afterEach, before, beforeEach, mock } = require('node:test');

function useContextHooks (testContext) {
    const contextBeforeEach = testContext && testContext.beforeEach ? testContext.beforeEach : beforeEach;
    const contextAfterEach = testContext && testContext.afterEach ? testContext.afterEach : afterEach;
    const contextBefore = testContext && testContext.before ? testContext.before : before;
    const contextAfter = testContext && testContext.after ? testContext.after : after;
    const contextMock = testContext && testContext.mock ? testContext.mock : mock;

    return {
        before: contextBefore,
        after: contextAfter,
        beforeEach: contextBeforeEach,
        afterEach: contextAfterEach,
        mock: contextMock,
    };
}

module.exports = useContextHooks;
