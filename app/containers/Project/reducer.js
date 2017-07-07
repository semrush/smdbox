import * as ACTION_TYPES from './actionTypes';
import URL from 'url-parse';

const initialState = {
    smdScheme: null,
    headers: {},
    endpoint: null,
    smdUrl: null,
    created: false,
    fetchingSchema: false,
    fetchingSmdError: false
};



function createProjectReducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_TYPES.FETCH:
        return { ...state, fetchingSchema: true };
    case ACTION_TYPES.FETCH_SUCCESS: {
        const url = new URL(action.smdUrl);
        return { ...state,
            smdScheme: action.smdScheme,
            smdUrl: action.smdUrl,
            endpoint: `${url.origin}${action.smdScheme.target}`,
            fetchingSchema: false,
            fetchingSmdError: false
        };
    }
    case ACTION_TYPES.FETCH_ERROR:
        return { ...state, fetchingSchema: false, fetchingSmdError: true };
    case ACTION_TYPES.CREATE:
        return { ...state, ...action.params, created: true };
    case ACTION_TYPES.CLEAR:
        return { ...initialState };
    default:
        return state;
    }
}

export default createProjectReducer;
