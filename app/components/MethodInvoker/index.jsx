import React from 'react';
import bemCl from 'bem-cl';

import FormFromSchema from 'components/FormFromSchema';
import RawJsonEditor from 'components/RawJsonEditor';
import JsonViewer from 'components/JsonViewer';

import { Alert, Tab, Tabs } from 'react-bootstrap';
import './MethodInvoker.scss';

const b = bemCl('sb-method-invoker');

class MethodInvoker extends React.PureComponent {
    handleSubmit = (params) => {
        this.props.runMethod(params);
    };
    
    handleSubmitRaw = (params) => {
        this.props.runMethod(params, true);
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
                <JsonViewer json={this.props.response} />
            </div>
        );
    }
    render() {
        return (
            <div className={b()}>
                <div className={b('content')}>
                    <Tabs
                        defaultActiveKey={1}
                        id="method-invoker-tabs"
                        mountOnEnter={true}
                        unmountOnExit={true}
                    >
                        <Tab eventKey={1} title="Form">
                            <FormFromSchema
                                schema={this.props.schema}
                                formData={this.props.formData}
                                onChange={this.props.changeFormData}
                                loading={this.props.loading}
                                onSubmit={this.handleSubmit}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Raw">
                            <RawJsonEditor
                                schema={this.props.schema}
                                formData={this.props.formData}
                                onChange={this.props.changeFormData}
                                method={this.props.method}
                                onSubmit={this.handleSubmitRaw}
                            />
                        </Tab>
                    </Tabs>
                </div>
                
                
                {
                    this.renderResponseIfNeeded()
                }
            </div>
        );
    }
}

export default MethodInvoker;
