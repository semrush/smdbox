import * as ACTION_TYPES from './actionTypes';

export const save = (params) => ({
    type: ACTION_TYPES.SAVE,
    params
});

export const selectItem = (item) => ({
    type: ACTION_TYPES.SELECT_ITEM,
    item
});

export const clearItem = () => ({
    type: ACTION_TYPES.CLEAR_ITEM
});

