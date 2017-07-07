import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Application from 'containers/Application';
import configureStore from './configureStore';

import 'styles/main.scss';

const rootNode = document.querySelector('#json-rpc-root');
const store = configureStore(JSON.parse(localStorage.getItem('smdBox')) || {});


const renderApp = App =>
    render(
        <Provider store={store}>
            <App key={Date.now()} />
        </Provider>,
        rootNode
    );

renderApp(Application);

if (module.hot) {
    module.hot.accept(['containers/Application'], () => {
        const NextApp = require('containers/Application').default;
        renderApp(NextApp);
    });
}
