import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as ACTION_TYPES from './actionTypes';
import * as ProjectActions from './actions';
import { clearStorage } from '../../helpers/session';

function* onFetch({ url, isRefresh }) {
    try {
        yield put({ type: ACTION_TYPES.FETCH_REQUEST });
        const smdScheme = yield call(() => {
            return axios.get(url);
        });
        yield put({ type: ACTION_TYPES.FETCH_SUCCESS, smdScheme: smdScheme.data, smdUrl: url, isRefresh });
        // if refresh - close settings
        if (isRefresh) {
            yield put(ProjectActions.closeSettings());
        }
    } catch (e) {
        yield put({ type: ACTION_TYPES.FETCH_ERROR });
    }
}

function* onClear() {
    clearStorage();
    yield put(ProjectActions.clearProject());
}

export default function* createProjectSaga() {
    yield [
        takeEvery(ACTION_TYPES.FETCH, onFetch),
        takeEvery(ACTION_TYPES.CLEAR_WITH_DB, onClear),
    ];
}
