import { call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import qs from 'qs';

import * as ACTION_TYPES from './actionTypes';
import * as Actions from './actions';

import { getSchema, getHeaders } from 'containers/CreateProject/selectors';
import { getSelectedMethod } from 'containers/Sidebar/selectors';
import { createRequest } from 'helpers/rpc';



const TMP_URL = 'http://riderhelp.ru';

function* onRunMethod(action) {
    try {
        const state = yield select();
        
        const schema = getSchema(state);
        const method = getSelectedMethod(state);
        const rpcRequestParams = createRequest({ method, params: action.params.formData });
        const headers = getHeaders(state);
        
        yield put(Actions.runMethodRequest());
        const response = yield call(axios.post, `${TMP_URL}${schema.target}`, rpcRequestParams);
        yield put(Actions.runMethodSuccess(response.data.result));
    } catch(e) {
        yield put(Actions.runMethodFailure(e));
    }
}

export default function* SelectedMethodSaga() {
    yield [
        takeEvery(ACTION_TYPES.RUN_METHOD, onRunMethod),
    ];
}
