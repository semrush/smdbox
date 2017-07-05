import { call, put, takeEvery } from 'redux-saga/effects';
import * as ACTION_TYPES from './actionTypes';
import $ from 'jquery';

function* onCreate({ params }) {
    try {
        const smdScheme = yield call(() => {
            return new Promise((resolve, reject) => {
                $.getJSON(params.smdUrl, (data) => {
                    resolve(data)
                })
            })
        });
        yield put({ type: ACTION_TYPES.CREATE_SUCCESS, params: { ...params, smdScheme } });
    } catch(e) {
        console.log(e);
    }
}

export default function* createProjectSaga() {
    yield [
        takeEvery(ACTION_TYPES.CREATE, onCreate),
    ];
}
