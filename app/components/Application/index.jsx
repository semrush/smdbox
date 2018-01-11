import React from 'react';
import PropTypes from 'prop-types';
import bemCl from 'bem-cl';

import Project from 'containers/Project';
import MethodViewer from 'containers/MethodViewer';
import History from 'containers/History';
import Sidebar from 'containers/Sidebar';
import { Grid, Col, Row, Modal } from 'react-bootstrap';

import './Application.scss';

const b = bemCl('sb-application');

class Application extends React.Component {
    static propTypes = {
        isProjectCreated: PropTypes.bool.isRequired,
        settingsOpen: PropTypes.bool.isRequired,
        closeSettings: PropTypes.func.isRequired,
        openSettings: PropTypes.func.isRequired,
        clearProject: PropTypes.func.isRequired,
    };
    
    
    state = {
        showHistory: false,
    };
    
    hideSettings = () => {
        this.props.closeSettings();
    };
    
    hideHistory = () => {
        this.setState({ showHistory: false });
    };
    showHistory = () => {
        this.setState({ showHistory: true });
    };
    
    render() {
        return (
            <div className={b()}>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">SMDbox</a>
                        </div>
                        { this.props.isProjectCreated &&
                        <ul className="nav navbar-nav navbar-right">
                            <li><a onClick={this.showHistory}>History</a></li>
                            <li><a onClick={this.props.openSettings}>Settings</a></li>
                            <li><a onClick={this.props.clearProject}>Exit</a></li>
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
                        <Col md={3} className={b('content-column').toString()}>
                            <Sidebar />
                        </Col>
                        <Col md={9} className={b('content-column').toString()}>
                            <MethodViewer />
                        </Col>
                    </Row>
                    <Modal show={this.props.settingsOpen} onHide={this.hideSettings}>
                        <Modal.Header closeButton>
                            <Modal.Title>Project settings</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Project mode="settings" onSubmit={this.hideSettings} />
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
