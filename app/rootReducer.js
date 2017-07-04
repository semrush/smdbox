import { combineReducers } from 'redux';
import application from 'containers/Application/reducer';
import createProject from 'containers/CreateProject/reducer';

const rootReducer = combineReducers({
    application,
    createProject
});

export default rootReducer;
