import smdToSchema from 'helpers/SMDToJSONSchema';

export const getSelectedMethod = (state, name) => {
    if (!state.project.smdScheme || !name || !state.project.smdScheme.services[name]) return null;
    return smdToSchema(state.project.smdScheme.services[name]);
};
