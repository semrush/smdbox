import * as ACTION_TYPES from './actionTypes';
import takeRight from 'lodash/takeRight';

const HISTORY_LIMIT = 10;

const initialState = {
    points: [],
    selectedItem: null
};

function HistoryReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SAVE:
            
            return {
                ...state,
                points: takeRight([
                    ...state.points,
                    action.params
                ], HISTORY_LIMIT)
            };
        case ACTION_TYPES.SELECT_ITEM:
            return {
                ...state,
                selectedItem: action.item
            };
        case ACTION_TYPES.CLEAR_ITEM:
            return {
                ...state,
                selectedItem: null
            };
        default:
            return state;
    }
}

export default HistoryReducer;
