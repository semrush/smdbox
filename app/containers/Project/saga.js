import { call, put, takeEvery } from 'redux-saga/effects';
import * as ACTION_TYPES from './actionTypes';
import axios from 'axios';

function* onFetch({ url }) {
    try {
        const smdScheme = yield call(() => {
            return axios.get(url);
        });
        yield put({ type: ACTION_TYPES.FETCH_SUCCESS, smdScheme: smdScheme.data, smdUrl: url });
    } catch(e) {
        yield put({ type: ACTION_TYPES.FETCH_ERROR });
    }
}

export default function* createProjectSaga() {
    yield [
        takeEvery(ACTION_TYPES.FETCH, onFetch),
    ];
}
