import smdToSchema from 'helpers/SMDToJSONSchema';
import { getSelectedMethod } from 'containers/Sidebar/selectors';

export const getSelectedMethodSchema = (state) => {
    const name = getSelectedMethod(state);
    
    if (!state.project.smdScheme || !name || !state.project.smdScheme.services[name]) return null;
    return smdToSchema(state.project.smdScheme.services[name]);
};
