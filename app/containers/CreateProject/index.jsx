import { connect } from 'react-redux';
import CreateProject from 'components/CreateProject';
import { upload } from './reducer';

export default connect(state => ({

}), {
    upload
})(CreateProject)
