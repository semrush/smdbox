import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import merge from 'lodash/merge';
import Application from 'containers/Application';
import { get as getStore } from 'helpers/session';
import configureStore from './configureStore';

import './styles/main.scss';

const autoInitSelector = '#json-rpc-root';

const defaultOptions = {
    endpoint: undefined,
    smdUrl: undefined,
    headers: {},
    selector: '#smdbox-root',
};

let rootNode;

const renderApp = (App, store) =>
    render(
        <Provider store={store}>
            <App key={Date.now()} />
        </Provider>,
        rootNode
    );

if (module.hot) {
    module.hot.accept(['containers/Application'], () => {
        const NextApp = require('containers/Application').default;
        renderApp(NextApp);
    });
}


const init = (opts = {}) => {
    const options = {
        ...defaultOptions,
        ...opts
    };

    const { smdUrl, endpoint, selector, headers } = options;
    if (selector) {
        rootNode = document.querySelector(selector);
    }

    getStore((storeData = {}) => {
        // set preconfigured smdUrl, endpoint and headers from config
        // filter null values if some of settings are not defined, to avoid current values reset
        const project = pickBy({ smdUrl, endpoint, headers }, identity);
        merge(storeData, { project });
        const store = configureStore(storeData);
        renderApp(Application, store);
    });
};

// try to auto init without calls (backward compatibilty)
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector(autoInitSelector)) {
        init({ selector: autoInitSelector });
    }
});

window.smdbox = init;

export default init;

