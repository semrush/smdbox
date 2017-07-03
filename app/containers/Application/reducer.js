import * as ACTION_TYPES from './actionTypes';

const initialState = {
  initialized: false
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default appReducer;
