import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Application from 'containers/Application';
import { get as getStore } from 'helpers/session';
import configureStore from './configureStore';

import './styles/main.scss';

const rootNode = document.querySelector('#json-rpc-root');

const renderApp = (App, store) =>
    render(
        <Provider store={store}>
            <App key={Date.now()} />
        </Provider>,
        rootNode
    );

getStore((storeData) => {
    const store = configureStore(storeData || {});
    renderApp(Application, store);
});


if (module.hot) {
    module.hot.accept(['containers/Application'], () => {
        const NextApp = require('containers/Application').default;
        renderApp(NextApp);
    });
}
