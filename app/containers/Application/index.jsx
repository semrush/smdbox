import { connect } from 'react-redux';
import Application from 'components/Application';
import { clearProject, openSettings, closeSettings } from '../Project/actions';

export default connect(
    state => ({
        isProjectCreated: state.project.created,
        settingsOpen: state.project.settingsOpen,
    }),
    {
        clearProject,
        openSettings,
        closeSettings
    }
)(Application)
