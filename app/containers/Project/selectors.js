export const get = state => state.project;
export const getSchema = state => state.project.smdScheme;

export const getHeaders = state => state.project.headers;

export const getEndPoint = state => state.project.endpoint;

export const isProjectCreated = state => state.project.created;
export const areSettingsOpened = state => state.project.settingsOpen;
