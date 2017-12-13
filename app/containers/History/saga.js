import { put, select, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid';
import * as METHOD_ACTION_TYPES from 'containers/SelectedMethod/actionTypes';
import { getSelectedMethodFullState } from 'containers/SelectedMethod/selectors';
import { getSelectedMethod } from 'containers/Sidebar/selectors';

import { save } from './actions';

function* handleRunMethod() {
    const state = yield select();
    const selectedMethod = getSelectedMethod(state);
    const selectedMethodState = getSelectedMethodFullState(state);
    yield put(save({
        id: uuid.v4(),
        method: selectedMethod,
        response: selectedMethodState.response,
        formData: selectedMethodState.formData,
    }));
}
export default function* HistorySaga() {
    yield [
        takeEvery(METHOD_ACTION_TYPES.RUN_METHOD_SUCCESS, handleRunMethod),
    ];
}
