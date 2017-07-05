import { connect } from 'react-redux';
import Sidebar from 'components/Sidebar';
import reduce from 'lodash/reduce';
import { selectService } from './reducer';

export default connect((state) => {
    
    return {
        namespacedMethods: reduce(state.project.smdScheme.services, (namespaces, service, key) => {
            if (key.split('.').length === 2) {
                const namespace = key.split('.')[0];
                const method = key.split('.')[1];
                namespaces[namespace] = { ...namespaces[namespace], [method]: service };
            }
            return namespaces;
        }, {}),
        otherMethods: reduce(state.project.smdScheme.services, (otherMethods, service, key) => {
            if (key.split('.').length === 1) {
                otherMethods[key] = service;
            }
            return otherMethods;
        }, {}),
        selectedService: state.sidebar.selected
    }
}, {
    selectService
})(Sidebar)
