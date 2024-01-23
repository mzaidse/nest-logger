import {createHook, executionAsyncId} from 'async_hooks';
const store = new Map();

export const asyncHook = createHook({
    init: (asyncId: any, _: any, triggerAsyncId: any) => {
        if (store.has(triggerAsyncId)) {
           store.set(asyncId, store.get(triggerAsyncId))
        }
    },
    destroy: (asyncId: any) => {
        if (store.has(asyncId)) {
            store.delete(asyncId);
        }
    }
});
asyncHook.enable();

export const createRequestContext = (data: any) => {
    store.set(executionAsyncId(), data);
    return data;
};

export const getRequestContext = () => {
    return store.get(executionAsyncId());
};