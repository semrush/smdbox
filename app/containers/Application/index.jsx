import React from 'react';
import bemCl from 'bem-cl';
import { connect } from 'react-redux';

import Application from 'components/Application';

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
            <div className={b()}>
                <Application/>
            </div>
        );
    }
}


export default ApplicationContainer;
