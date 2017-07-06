import { call, put, takeEvery } from 'redux-saga/effects';
import * as ACTION_TYPES from './actionTypes';
import $ from 'jquery';

function* onFetch({ url }) {
    try {
        const smdScheme = yield call(() => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url,
                    dataType: 'json',
                    success: function( data ) {
                        resolve(data)
                    },
                    error: function( data ) {
                        reject(data)
                    }
                });
            })
        });
        yield put({ type: ACTION_TYPES.FETCH_SUCCESS, smdScheme, smdUrl: url });
    } catch(e) {
        yield put({ type: ACTION_TYPES.FETCH_ERROR });
    }
}

export default function* createProjectSaga() {
    yield [
        takeEvery(ACTION_TYPES.FETCH, onFetch),
    ];
}
