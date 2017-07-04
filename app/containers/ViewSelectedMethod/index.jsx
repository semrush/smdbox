import React from 'react';
import { connect } from 'react-redux';

import MethodViewer from 'components/MethodViewer';
import { getSelectedMethodSchema } from './selectors';


export default connect(
    state => ({
        methodSchema: getSelectedMethodSchema(state)
    })
)(MethodViewer);
