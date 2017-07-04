import React from 'react';
import { connect } from 'react-redux';

import MethodViewer from 'components/MethodViewer';
import { getSelectedMethodSchema } from './selectors';
import { getSelectedMethod } from 'containers/Sidebar/selectors';

export default connect(
    state => ({
        methodSchema: getSelectedMethodSchema(state),
        selectedMethod: getSelectedMethod(state)
    })
)(MethodViewer);
