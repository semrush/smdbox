import React from 'react';
import { connect } from 'react-redux';

import MethodViewer from 'components/MethodViewer';
import { getSelectedMethodSchema, getSelectedMethodFullState } from './selectors';
import { getSelectedMethod } from 'containers/Sidebar/selectors';
import { runMethod } from './actions';

export default connect(
    state => ({
        methodSchema: getSelectedMethodSchema(state),
        selectedMethod: getSelectedMethod(state),
        state: getSelectedMethodFullState(state)
    }),
    {
        runMethod
    }
)(MethodViewer);
