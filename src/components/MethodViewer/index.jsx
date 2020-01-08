import React from 'react';
import bemCl from 'bem-cl';
import PropTypes from 'prop-types';
import MethodDescription from 'components/MethodDescription';
import MethodInvoker from 'components/MethodInvoker';
import { Grid, Col, Row, Alert, Button } from 'react-bootstrap';

import './MethodViewer.scss';

const b = bemCl('sb-method-viewer');

class MethodViewer extends React.PureComponent {
    static propTypes = {
        methodSchema: PropTypes.object.isRequired,
        formData: PropTypes.object,
        changeFormData: PropTypes.func.isRequired,
        runMethod: PropTypes.func.isRequired,
        hideError: PropTypes.func.isRequired,
        loading: PropTypes.bool,
        error: PropTypes.object,
        response: PropTypes.object,
        state: PropTypes.object,
        selectedMethod: PropTypes.string.isRequired
    };

    static defaultProps = {
        error: null,
        loading: false,
        response: undefined,
        formData: {},
        state: {}
    };

    state = { showInfo: true, showTry: true };

    showInfo = (show = true) => {
        this.setState({ showInfo: show });
    };

    showTry = (show = true) => {
        this.setState({ showTry: show });
    };

    renderContent() {
        if (!this.props.methodSchema) {
            return (
                <Alert bsStyle="info">
                    Select method from list at left
                </Alert>
            );
        }

        return (
            <Grid fluid>
                <Row>
                    {
                        this.state.showInfo && (
                            <Col md={this.state.showTry ? 7 : 12}>
                                <h3>
                                    {this.props.selectedMethod}
                                    { !this.state.showTry && (
                                        <Button
                                            bsStyle="success"
                                            bsSize="xsmall"
                                            onClick={this.showTry}
                                        >
                                            Try it
                                        </Button>
                                    )}
                                    { this.state.showTry && (
                                        <Button
                                            bsSize="xsmall"
                                            onClick={() => { this.showInfo(false); }}
                                        >
                                            Hide
                                        </Button>
                                    )}
                                </h3>
                                <MethodDescription
                                    method={this.props.selectedMethod}
                                    schema={this.props.methodSchema}
                                />
                            </Col>
                        )
                    }

                    {
                        this.state.showTry && (
                            <Col md={this.state.showInfo ? 5 : 12}>
                                <h3>
                                    Try it out
                                    { !this.state.showInfo && (
                                        <Button
                                            bsSize="xsmall"
                                            bsStyle="success"
                                            onClick={this.showInfo}
                                        >
                                            Show description
                                        </Button>
                                    )}
                                    { this.state.showInfo && (
                                        <Button
                                            bsSize="xsmall"
                                            onClick={() => { this.showTry(false); }}
                                        >
                                            Hide
                                        </Button>
                                    )}
                                </h3>
                                <MethodInvoker
                                    schema={this.props.methodSchema}
                                    runMethod={this.props.runMethod}
                                    loading={this.props.state.loading}
                                    response={this.props.state.response}
                                    hideError={this.props.hideError}
                                    method={this.props.selectedMethod}
                                    changeFormData={this.props.changeFormData}
                                    formData={this.props.state.formData}
                                    error={this.props.state.error}
                                />
                            </Col>
                        )
                    }

                </Row>
            </Grid>
        );
    }
    render() {
        return (
            <div className={b()}>
                { this.renderContent() }
            </div>
        );
    }
}


export default MethodViewer;
