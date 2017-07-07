import React from 'react';
import { connect } from 'react-redux';

import History from 'components/History';
import { save, selectItem, clearItem } from './actions';
import { getHistoryPoints, getSelectedItem } from './selectors';

export default connect(
    state => ({
        items: getHistoryPoints(state),
        selectedItem: getSelectedItem(state)
    }),
    {
        save,
        selectItem,
        clearItem
    }
)(History);
