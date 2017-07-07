import { combineReducers } from 'redux';
import application from 'containers/Application/reducer';
import project from 'containers/Project/reducer';
import sidebar from 'containers/Sidebar/reducer';
// import history from 'containers/History/reducer';
import selectedMethod from 'containers/SelectedMethod/reducer';

const rootReducer = combineReducers({
    application,
    project,
    sidebar,
    selectedMethod,
    // history
});

export default rootReducer;
