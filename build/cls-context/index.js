"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestContext = exports.createRequestContext = exports.asyncHook = void 0;
const async_hooks_1 = require("async_hooks");
const store = new Map();
exports.asyncHook = (0, async_hooks_1.createHook)({
    init: (asyncId, _, triggerAsyncId) => {
        if (store.has(triggerAsyncId)) {
            store.set(asyncId, store.get(triggerAsyncId));
        }
    },
    destroy: (asyncId) => {
        if (store.has(asyncId)) {
            store.delete(asyncId);
        }
    }
});
exports.asyncHook.enable();
const createRequestContext = (data) => {
    store.set((0, async_hooks_1.executionAsyncId)(), data);
    return data;
};
exports.createRequestContext = createRequestContext;
const getRequestContext = () => {
    return store.get((0, async_hooks_1.executionAsyncId)());
};
exports.getRequestContext = getRequestContext;
//# sourceMappingURL=index.js.map