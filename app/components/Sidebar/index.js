import React from 'react';
import map from 'lodash/map';
import './Sidebar.scss';

export default class extends React.Component {
    
    render() {
        
        return (
            <div className="sb-sidebar">
                { map(this.props.namespacedMethods, (namespace, namespaceKey) => (
                    <div key={ namespaceKey }>
                        <div className="h3">{ namespaceKey }</div>
                        <ul className="nav nav-pills nav-stacked">
                            { map(namespace, (method, methodKey) => (
                                <li
                                    key={ methodKey }
                                    onClick={ () => this.props.selectService(`${namespaceKey}.${methodKey}`) }
                                    className={ this.props.selectedService === `${namespaceKey}.${methodKey}` ? 'active' : '' }
                                >
                                    <a href="" onClick={ (e) => e.nativeEvent.preventDefault() }>{ methodKey }</a>
                                </li>
                            )) }
                        </ul>
                    </div>
                )) }
            </div>
        )
    }
}
