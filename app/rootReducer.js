import { combineReducers } from 'redux';
import application from 'containers/Application/reducer';
import project from 'containers/CreateProject/reducer';

const rootReducer = combineReducers({
    application,
    project
});

export default rootReducer;
