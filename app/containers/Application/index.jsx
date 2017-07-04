import { connect } from 'react-redux';
import Application from 'components/Application';

export default connect(
    state => ({
        isProjectEmpty: state.project.smdScheme === null
    })
)(Application)
