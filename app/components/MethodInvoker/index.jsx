import React from 'react';
import bemCl from 'bem-cl';

import FormFromSchema from 'components/FormFromSchema';
import JsonViewer from 'components/JsonViewer';
import { Alert } from 'react-bootstrap';
import './MethodInvoker.scss';

const b = bemCl('sb-method-invoker');

class MethodInvoker extends React.PureComponent {
    handleSubmit = (params) => {
        this.props.runMethod(params);
    };
    
    renderResponseIfNeeded() {
        if (this.props.loading) {
            return (
                <div className={b('loading')}>
                    <i className="glyphicon glyphicon-refresh"></i>
                </div>
            );
        }
        
        if (this.props.error && this.props.error.message) {
            return (
                <Alert bsStyle="danger" onDismiss={this.props.hideError}>
                    {this.props.error.message}
                </Alert>
            );
        }
        if (!this.props.response) return null;
        
        return (
            <div className={b('result')}>
                <h3>Result</h3>
                <JsonViewer json={this.props.response} />
            </div>
        );
    }
    render() {
        return (
            <div className={b()}>
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
