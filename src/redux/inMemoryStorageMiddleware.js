// src/store/inMemoryStorageMiddleware.js
import { saveState, loadState } from '../utils/inMemoryStorage';

const inMemoryStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    saveState('reduxState', store.getState());
    return result;
};

export default inMemoryStorageMiddleware;
