import React from 'react';
import './Application.scss';
import CreateProject from 'containers/CreateProject';

import 'antd/dist/antd.css';

class Application extends React.PureComponent {
    
    render() {
        return (
            <CreateProject />
        );
    }
}

export default Application;
