import * as ACTION_TYPES from './actionTypes';

const initialState = {
    selected: null
};


export default function sidebarReducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_TYPES.SELECT_SERVICE:
        return {
            ...state,
            selected: action.service
        };
    default:
        return state;
    }
}
