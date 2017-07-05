import * as ACTION_TYPES from './actionTypes';

const initialState = {
    smdScheme: null,
    headers: {},
    endpoint: null
};

export function create(params) {
    return { type: ACTION_TYPES.CREATE, params }
}

export function clearProject() {
    return { type: ACTION_TYPES.CLEAR }
}

function createProjectReducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_TYPES.CREATE_SUCCESS:
        return { ...state, ...action.params };
    case ACTION_TYPES.CLEAR:
        return { ...initialState };
    default:
        return state;
    }
}

export default createProjectReducer;
