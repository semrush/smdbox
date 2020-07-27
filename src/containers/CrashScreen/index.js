import { connect } from 'react-redux';
import CrashScreen from 'components/CrashScreen';
import { clearProjectWithDbReset as clearProject } from '../Project/actions';

export default connect(
    () => ({

    }),
    {
        clearProject,
    }
)(CrashScreen);
