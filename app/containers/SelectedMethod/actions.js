import * as ACTION_TYPES from './actionTypes';

export const runMethod = (params) => ({
    type: ACTION_TYPES.RUN_METHOD,
    params
});

export const runMethodRequest = (params) => ({
    type: ACTION_TYPES.RUN_METHOD_REQUEST,
    params
});

export const runMethodSuccess = (response = {}) => ({
    type: ACTION_TYPES.RUN_METHOD_SUCCESS,
    response
});

export const runMethodFailure = (error = '') => ({
    type: ACTION_TYPES.RUN_METHOD_FAILURE,
    error
});
