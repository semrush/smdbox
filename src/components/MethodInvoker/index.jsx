import React from 'react';
import PropTypes from 'prop-types';
import bemCl from 'bem-cl';
import isUndefined from 'lodash/isUndefined';

import FormFromSchema from 'components/FormFromSchema';
import RawJsonEditor from 'components/RawJsonEditor';
import JsonViewer from 'components/JsonViewer';


import { Alert, Tab, Tabs } from 'react-bootstrap';
import './MethodInvoker.scss';

const b = bemCl('sb-method-invoker');

class MethodInvoker extends React.PureComponent {
    static propTypes = {
        schema: PropTypes.object.isRequired,
        formData: PropTypes.object,
        changeFormData: PropTypes.func.isRequired,
        runMethod: PropTypes.func.isRequired,
        hideError: PropTypes.func.isRequired,
        loading: PropTypes.bool,
        error: PropTypes.object,
        response: PropTypes.object,
        method: PropTypes.string.isRequired
    };
    
    static defaultProps = {
        error: null,
        loading: false,
        response: undefined,
        formData: {}
    };
    
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
                    <i className="glyphicon glyphicon-refresh" />
                </div>
            );
        }
        
        if (this.props.error && this.props.error.message) {
            return (
                <Alert bsStyle="danger" onDismiss={this.props.hideError}>
                    <div>
                        {this.props.error.message}
                    </div>
                    {
                        this.props.error.data && (
                            <div>
                                {this.props.error.data}
                            </div>
                        )
                    }
                </Alert>
            );
        }
        if (isUndefined(this.props.response)) return null;
        
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
                        mountOnEnter
                        unmountOnExit
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
