import * as ACTION_TYPES from './actionTypes';

const initialState = {
  smdScheme: null
};

export function upload(url) {
    return { type: ACTION_TYPES.UPLOAD, url }
}

export function clearProject() {
    return { type: ACTION_TYPES.CLEAR }
}

function createProjectReducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_TYPES.UPLOAD_SUCCESS:
        return { ...state, smdScheme: action.smdScheme };
    case ACTION_TYPES.CLEAR:
        return { ...state, smdScheme: null };
    default:
        return state;
    }
}

export default createProjectReducer;
