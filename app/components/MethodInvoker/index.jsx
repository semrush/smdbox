import React from 'react';
import bemCl from 'bem-cl';

import FormFromSchema from 'components/FormFromSchema';
import JsonViewer from 'components/JsonViewer';

const b = bemCl('sb-method-invoker');

class MethodInvoker extends React.PureComponent {
    handleSubmit = (params) => {
        this.props.runMethod(params);
    };
    
    renderResponseIfNeeded() {
        if (!this.props.response) return null;
        
        return (
            <JsonViewer json={this.props.response} />
        );
    }
    render() {
        return (
            <div className={b()}>
                <h2>Try it out</h2>
                <FormFromSchema
                    schema={this.props.schema}
                    loading={this.props.loading}
                    onSubmit={this.handleSubmit}
                />
                {
                    this.renderResponseIfNeeded()
                }
            </div>
        );
    }
}

export default MethodInvoker;
