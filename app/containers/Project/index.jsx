import { connect } from 'react-redux';
import Project from 'components/Project';
import { create, fetchSmd } from './actions';
import pick from 'lodash/pick'

export default connect(state => ({
    ...pick(state.project, 'headers', 'endpoint', 'fetchingSchema', 'smdScheme', 'fetchingSmdError')
}), {
    create,
    fetchSmd
})(Project)
