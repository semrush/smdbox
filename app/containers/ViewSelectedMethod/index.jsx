import React from 'react';
import { connect } from 'react-redux';
import bemCl from 'bem-cl';

import FormFromSchema from 'components/FormFromSchema';
import { getSelectedMethod } from './selectors';

const b = bemCl('sb-view-selected-method-container');

@connect(
    state => ({
        methodSchema: getSelectedMethod(state, 'lists.Episodes')
    }),
    {
        
    }
)
class ViewSelectedMethodContainer extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                {
                    this.props.methodSchema ?
                    <FormFromSchema schema={this.props.methodSchema} /> :
                    null
                }
            </div>
        );
    }
}


export default ViewSelectedMethodContainer;
