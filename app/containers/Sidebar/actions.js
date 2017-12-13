import * as ACTION_TYPES from './actionTypes';

export function selectService(service) {
    return { type: ACTION_TYPES.SELECT_SERVICE, service };
}
