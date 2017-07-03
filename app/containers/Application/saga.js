import { call, put, takeEvery } from 'redux-saga/effects';
import ACTION_TYPES from './actionTypes';


function* onInitialize() {

}


export default function* applicationSaga() {
    yield [
        // takeEvery(ACTION_TYPES.INITIALIZE, onInitialize),
    ];
}
