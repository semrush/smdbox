import { connect } from 'react-redux';
import Project from 'components/Project';

import { create, fetchSmd } from './actions';
import { get as getProject } from './selectors';


export default connect(state => ({
    ...getProject(state)
}), {
    create,
    fetchSmd
})(Project);
