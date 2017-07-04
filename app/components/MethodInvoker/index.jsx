import React from 'react';
import FormFromSchema from 'components/FormFromSchema';

class MethodInvoker extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>Try it out</h2>
                <FormFromSchema schema={this.props.schema} />
            </div>
        );
    }
}

export default MethodInvoker;
