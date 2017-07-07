import { call, put, select, takeEvery } from 'redux-saga/effects';

import * as METHOD_ACTIONS from 'containers/SelectedMethod/actionTypes';
import { get} from 'containers/SelectedMethod/selectors';
import { get} from 'containers/Sidebar/selectors';


function* handleRunMethod(action) {
    console.log("Should save action", action);
}
export default function* HistorySaga() {
    yield [
        takeEvery(METHOD_ACTIONS.RUN_METHOD, handleRunMethod),
    ];
}
