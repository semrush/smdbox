import * as ACTION_TYPES from './actionTypes';

const initialState = {
  smdScheme: null
};

export function upload(url) {
    return { type: ACTION_TYPES.UPLOAD, url }
}

function createProjectReducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_TYPES.UPLOAD_SUCCESS:
        return { ...state, smdScheme: action.smdScheme }
    default:
        return state;
    }
}

export default createProjectReducer;
