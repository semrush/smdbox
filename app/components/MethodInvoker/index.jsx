import React from 'react';
import bemCl from 'bem-cl';

import FormFromSchema from 'components/FormFromSchema';
import JsonViewer from 'components/JsonViewer';
import { Alert, Tab, Tabs } from 'react-bootstrap';
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
                <Tabs
                    defaultActiveKey={1}
                    id="method-invoker-tabs"
                >
                    <Tab eventKey={1} title="Form">
                        <FormFromSchema
                            schema={this.props.schema}
                            loading={this.props.loading}
                            onSubmit={this.handleSubmit}
                        />
                    </Tab>
                    <Tab eventKey={2} title="Raw">
                        Raw
                    </Tab>
                </Tabs>
                
                {
                    this.renderResponseIfNeeded()
                }
            </div>
        );
    }
}

export default MethodInvoker;
