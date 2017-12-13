import { connect } from 'react-redux';
import Sidebar from 'components/Sidebar';
import { getNamespacedMethods, getOtherMethods } from '../Project/selectors';
import { getSelectedMethod } from '../Sidebar/selectors';
import { selectService } from './reducer';

export default connect((state) => {
    return {
        namespacedMethods: getNamespacedMethods(state),
        otherMethods: getOtherMethods(state),
        selectedService: getSelectedMethod(state)
    };
}, {
    selectService
})(Sidebar);
