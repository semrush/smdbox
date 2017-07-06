import { connect } from 'react-redux';
import Project from 'components/Project';
import { create } from './reducer';

export default connect(state => ({
    project: state.project
}), {
    create
})(Project)
