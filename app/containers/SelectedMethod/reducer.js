import * as ACTION_TYPES from './actionTypes';

const initialState = {
    loading: false,
    response: null
};

function SelectedMethodReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.RUN_METHOD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ACTION_TYPES.RUN_METHOD_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.response
            };
        case ACTION_TYPES.RUN_METHOD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default SelectedMethodReducer;
