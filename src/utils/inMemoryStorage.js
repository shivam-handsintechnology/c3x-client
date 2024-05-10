// src/utils/inMemoryStorage.js
let inMemoryStorage = {};

export const saveState = (key, state) => {
    inMemoryStorage[key] = state;
};

export const loadState = (key) => {
    return inMemoryStorage[key];
};
