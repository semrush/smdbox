import { connect } from 'react-redux';
import Sidebar from 'components/Sidebar';
import reduce from 'lodash/reduce';
import { selectService } from './reducer';

export default connect((state) => ({
    namespacedMethods: reduce(state.project.smdScheme.services, (namespaces, service, key) => {
        const namespace = key.split('.')[0];
        const method = key.split('.')[1];
        namespaces[namespace] = { ...namespaces[namespace], [method]: service };
        return namespaces;
    }, {}),
    selectedService: state.sidebar.selected
}), {
    selectService
})(Sidebar)
