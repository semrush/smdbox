import { connect } from 'react-redux';
import Application from 'components/Application';
import { clearProject, openSettings, closeSettings } from '../Project/actions';
import { isProjectCreated, areSettingsOpened } from '../Project/selectors';

export default connect(
    state => ({
        isProjectCreated: isProjectCreated(state),
        settingsOpen: areSettingsOpened(state),
    }),
    {
        clearProject,
        openSettings,
        closeSettings
    }
)(Application);
