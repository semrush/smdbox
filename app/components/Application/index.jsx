import React from 'react';
import bemCl from 'bem-cl';
import './Application.scss';
const b = bemCl('sb-application');
import CreateProject from 'containers/CreateProject';
import MainLayout from 'components/MainLayout';

import SelectedMethod from 'containers/SelectedMethod';
import Sidebar from 'containers/Sidebar';
import { Grid, Col, Row } from 'react-bootstrap';

class Application extends React.PureComponent {
    
    render() {
        return (
        <div>
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">SMDbox</a>
                    </div>
                    { !this.props.isProjectEmpty &&
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="" onClick={ (e) => {
                                e.nativeEvent.preventDefault();
                                this.props.clearProject();
                            } }>Exit</a></li>
                        </ul>
                    }
                </div>
            </nav>
            {
                this.props.isProjectEmpty &&
                <Grid>
                    <CreateProject />
                </Grid>
            }
            {
                !this.props.isProjectEmpty &&
                <Grid fluid>
                    <Row>
                        <Col md={3}>
                            <Sidebar />
                        </Col>
                        <Col md={9}>
                            <SelectedMethod />
                        </Col>
                    </Row>
                </Grid>
            }
        </div>
        );
    }
}

export default Application;
