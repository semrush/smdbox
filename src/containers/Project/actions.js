import * as ACTION_TYPES from './actionTypes';

export function fetchSmd(url, isRefresh = false) {
    return {
        type: ACTION_TYPES.FETCH,
        url,
        isRefresh
    };
}

export function create(params) {
    return {
        type: ACTION_TYPES.CREATE,
        params
    };
}

export function clearProject() {
    return {
        type: ACTION_TYPES.CLEAR
    };
}

export function clearProjectWithDbReset() {
    return {
        type: ACTION_TYPES.CLEAR_WITH_DB
    };
}

export function openSettings() {
    return {
        type: ACTION_TYPES.OPEN_SETTINGS
    };
}

export function closeSettings() {
    return {
        type: ACTION_TYPES.CLOSE_SETTINGS
    };
}
