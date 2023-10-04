const { after, afterEach, before, beforeEach, mock } = require('node:test');

function useContextHooks (testContext) {
    const contextBeforeEach = false && testContext.beforeEach ? testContext.beforeEach : beforeEach;
    const contextAfterEach = false && testContext.afterEach ? testContext.afterEach : afterEach;
    const contextBefore = false && testContext.before ? testContext.before : before;
    const contextAfter = false && testContext.after ? testContext.after : after;
    const contextMock = false && testContext.mock ? testContext.mock : mock;

    return {
        before: contextBefore,
        after: contextAfter,
        beforeEach: contextBeforeEach,
        afterEach: contextAfterEach,
        mock: contextMock,
    };
}

module.exports = useContextHooks;
