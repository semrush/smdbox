import React from 'react';
import bemCl from 'bem-cl';
import './Application.scss';
const b = bemCl('sb-application');
import CreateProject from 'containers/CreateProject';
import MainLayout from 'components/MainLayout';
import ViewSelectedMethod from 'containers/ViewSelectedMethod';
import Sidebar from 'containers/Sidebar';
import { Grid, Col, Row } from 'react-bootstrap';

class Application extends React.PureComponent {
    
    render() {
        return (
            <MainLayout
                content={
                    <div className={b()}>
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
                                    <Col md={4}>
                                        <Sidebar />
                                    </Col>
                                    <Col md={8}>
                                        <ViewSelectedMethod />
                                    </Col>
                                </Row>
                            </Grid>
                        }
                    </div>
                }
            />
        );
    }
}

export default Application;
