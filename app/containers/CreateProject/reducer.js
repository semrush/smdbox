import * as ACTION_TYPES from './actionTypes';

const initialState = {
  smdScheme: null
};

export function upload(url) {
    return { type: ACTION_TYPES.UPLOAD, url }
}

function createProjectReducer(state = initialState, action) {
    switch (action.type) {
    
    default:
        return state;
    }
}

export default createProjectReducer;
