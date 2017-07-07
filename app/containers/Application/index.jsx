import { connect } from 'react-redux';
import Application from 'components/Application';
import { clearProject } from '../Project/actions';

export default connect(
    state => ({
        isProjectCreated: state.project.created
    }),
    {
        clearProject
    }
)(Application)
