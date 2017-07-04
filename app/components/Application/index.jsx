import React from 'react';
import './Application.scss';
import CreateProject from 'containers/CreateProject';

class Application extends React.PureComponent {
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">SMDbox</a>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <CreateProject />
                </div>
            </div>
        );
    }
}

export default Application;
