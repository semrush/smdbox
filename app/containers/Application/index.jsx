import { connect } from 'react-redux';
import Application from 'components/Application';
import { clearProject } from '../CreateProject/reducer';

export default connect(
    state => ({
        isProjectEmpty: state.project.smdScheme === null
    }),
    {
        clearProject
    }
)(Application)
