import React from 'react';
import bemCl from 'bem-cl';
import './Application.scss';

const b = bemCl('j-application');

class Application extends React.PureComponent {
    
    render() {
        return (
            <div className={b()}>HELLO! THIS IS JSON RPС</div>
        );
    }
}

export default Application;
