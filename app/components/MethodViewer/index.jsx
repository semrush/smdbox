import React from 'react';
import bemCl from 'bem-cl';

import MethodDescription from 'components/MethodDescription';
import MethodInvoker from 'components/MethodInvoker';
import { Grid, Col, Row } from 'react-bootstrap';

const b = bemCl('sb-method-viewer');

class MethodViewer extends React.PureComponent {
    renderContent() {
        if (!this.props.methodSchema) {
            return (
                <div className="alert alert-info">
                    Select method from list at left
                </div>
            )
        }
        
        return (
            <Grid fluid>
                <Row>
                    <Col md={7}>
                        <MethodDescription
                            method={this.props.selectedMethod}
                            schema={this.props.methodSchema}
                        />
                    </Col>
                    <Col md={5}>
                        <MethodInvoker
                            schema={this.props.methodSchema}
                            runMethod={this.props.runMethod}
                            loading={this.props.state.loading}
                            response={this.props.state.response}
                            hideError={this.props.hideError}
                            error={this.props.state.error}
                        />
                    </Col>
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
