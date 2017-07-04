import { call, put, takeEvery } from 'redux-saga/effects';
import * as ACTION_TYPES from './actionTypes';
import $ from 'jquery';


function* onUpload({ url }) {
    try {
        const data = yield call(() => {
            return new Promise((resolve, reject) => {
                $.getJSON(url, (data) => {
                    resolve(data)
                })
            })
        });
        yield put({ type: ACTION_TYPES.UPLOAD_SUCCESS, data });
    } catch(e) {
        console.log(e);
    }
}

export default function* createProjectSaga() {
    yield [
        takeEvery(ACTION_TYPES.UPLOAD, onUpload),
    ];
}
