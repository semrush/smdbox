import React from 'react';
import bemCl from 'bem-cl';
import './Application.scss';
const b = bemCl('sb-application');
import CreateProject from 'containers/CreateProject';
import MainLayout from 'components/MainLayout';
import ViewSelectedMethod from 'containers/ViewSelectedMethod';

class Application extends React.PureComponent {
    
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

export default Application;
