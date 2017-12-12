import React from 'react';
import PropTypes from 'prop-types';

class MainLayout extends React.PureComponent{
    static propTypes = {
        content: PropTypes.element
    };
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">SMDbox</a>
                        </div>
                        
                        <ul className="nav navbar-nav navbar-right">
                            <li>{  }</li>
                        </ul>
                    </div>
                </nav>
                {this.props.content}
            </div>
        )
    }
}

export default MainLayout;
