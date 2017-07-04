import React from 'react';
import bemCl from 'bem-cl';
import { connect } from 'react-redux';
import CreateProject from 'containers/CreateProject';
import ViewSelectedMethod from 'containers/ViewSelectedMethod';
import MainLayout from 'components/MainLayout';

const b = bemCl('json-application-container');

@connect(
    state => ({

    }),
    {
    }
)
class ApplicationContainer extends React.PureComponent {
    render() {
        return (
            <MainLayout
                content={
                    <div className={b()}>
                        <CreateProject />
                        <ViewSelectedMethod />
                    </div>
                }
            />
        );
    }
}


export default ApplicationContainer;
