import * as ACTION_TYPES from './actionTypes';

export function fetchSmd(url) {
    return {
        type: ACTION_TYPES.FETCH,
        url
    }
}

export function create(params) {
    return {
        type: ACTION_TYPES.CREATE,
        params
    }
}

export function clearProject() {
    return {
        type: ACTION_TYPES.CLEAR
    }
}

