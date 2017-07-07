import React from 'react';
import bemCl from 'bem-cl';

import Project from 'containers/Project';
import SelectedMethod from 'containers/SelectedMethod';
import History from 'containers/History';
import Sidebar from 'containers/Sidebar';
import { Grid, Col, Row, Modal } from 'react-bootstrap';

import './Application.scss';

const b = bemCl('sb-application');

class Application extends React.PureComponent {
    
    state = {
        showSettings: false,
        showHistory: false,
    };
    
    hideSettings = () => {
        this.setState({ showSettings: false })
    };
    
    hideHistory = () => {
        this.setState({ showHistory: false });
    };
    showHistory = () => {
        this.setState({ showHistory: true })
    };
    
    render() {
        return (
        <div className={ b() }>
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">SMDbox</a>
                    </div>
                    { this.props.isProjectCreated &&
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="" onClick={ (e) => {
                                e.nativeEvent.preventDefault();
                                this.showHistory();
                            } }>History</a></li>
                            <li><a href="" onClick={ (e) => {
                                e.nativeEvent.preventDefault();
                                this.setState({ showSettings: true })
                            } }>Settings</a></li>
                            <li><a href="" onClick={ (e) => {
                                e.nativeEvent.preventDefault();
                                this.props.clearProject();
                            } }>Exit</a></li>
                        </ul>
                    }
                </div>
            </nav>
            {
                !this.props.isProjectCreated &&
                <Grid style={{ paddingTop: '15px' }}>
                    <Project />
                </Grid>
            }
            {
                this.props.isProjectCreated &&
                <Grid fluid>
                    <Row>
                        <Col md={3} style={{ height: 'calc(100vh - 51px)', overflow: 'auto', paddingTop: '15px', paddingBottom: '15px' }}>
                            <Sidebar />
                        </Col>
                        <Col md={9} style={{ height: 'calc(100vh - 51px)', overflow: 'auto', paddingTop: '15px', paddingBottom: '15px' }}>
                            <SelectedMethod />
                        </Col>
                    </Row>
                    <Modal show={this.state.showSettings} onHide={this.hideSettings.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Project settings</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Project mode="settings" onSubmit={ this.hideSettings.bind(this) } />
                        </Modal.Body>
                    </Modal>
    
                    <Modal show={this.state.showHistory} onHide={this.hideHistory} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>Request history</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <History />
                        </Modal.Body>
                    </Modal>
                </Grid>
            }
        </div>
        );
    }
}

export default Application;
