import React from 'react';


class MainLayout extends React.PureComponent{
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
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default MainLayout;
