import { createSelector } from 'reselect';
import reduce from 'lodash/reduce';

export const get = state => state.project;
export const getSchema = state => get(state).smdScheme;
export const getServices = state => getSchema(state).services;

export const getHeaders = state => get(state).headers;

export const getEndPoint = state => get(state).endpoint;

export const isProjectCreated = state => get(state).created;
export const areSettingsOpened = state => get(state).settingsOpen;


export const getNamespacedMethods = createSelector(getServices, (services) => {
    return reduce(services, (namespaces, service, key) => {
        if (key.split('.').length === 2) {
            const namespace = key.split('.')[0];
            const method = key.split('.')[1];
            namespaces[namespace] = { ...namespaces[namespace], [method]: service }; // eslint-disable-line
        }
        return namespaces;
    }, {})
});

export const getOtherMethods = createSelector(getServices, (services) => {
    return reduce(services, (otherMethods, service, key) => {
        if (key.split('.').length === 1) {
            otherMethods[key] = service; // eslint-disable-line
        }
        return otherMethods;
    }, {})
});
