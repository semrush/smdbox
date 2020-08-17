import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncStore } from 'helpers/session';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancers = [];


if (__DEV__) {
    // eslint-disable-next-line no-underscore-dangle
    const reduxDevToolExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (reduxDevToolExtension) {
        enhancers.push(reduxDevToolExtension());
    }
}


export default function (initialData) {
    const store = createStore(
        rootReducer,
        initialData,
        compose(
            applyMiddleware(...middlewares),
            ...enhancers
        )
    );

    syncStore(store);

    sagaMiddleware.run(rootSaga);

    return store;
}
