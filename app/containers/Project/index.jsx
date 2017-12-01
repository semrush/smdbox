import { connect } from 'react-redux';
import Project from 'components/Project';
import pick from 'lodash/pick'
import { create, fetchSmd } from './actions';
import { get as getProject } from './selectors'


export default connect(state => ({
    ...getProject
}), {
    create,
    fetchSmd
})(Project)
