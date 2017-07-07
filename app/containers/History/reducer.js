import * as ACTION_TYPES from './actionTypes';

const initialState = {
    points: []
};

function HistoryReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SAVE:
            return {
                ...state,
                points: [
                    ...state.points,
                    action.params
                ]
            };
        default:
            return state;
    }
}

export default HistoryReducer;
