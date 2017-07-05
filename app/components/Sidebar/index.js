import React from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import './Sidebar.scss';

const Namespace = ({ namespaceName, children }) => (
    <div className="sb-sidebar__namespace">
        <div className="h3">{ namespaceName }</div>
        <ul className="nav nav-pills nav-stacked">
            { children }
        </ul>
    </div>
);

const Method = ({ methodName, selected, onSelect }) => {
    
    return (
        <li
            onClick={ onSelect }
            className={ selected ? 'active' : '' }
        >
            <a href="" onClick={ (e) => e.nativeEvent.preventDefault() }>{ methodName }</a>
        </li>
    )
};

export default class extends React.Component {
    
    render() {
        
        return (
            <div className="sb-sidebar">
                { map(this.props.namespacedMethods, (namespace, namespaceKey) => (
                    <Namespace namespaceName={ namespaceKey } key={ namespaceKey }>
                        { map(namespace, (method, methodKey) => (
                            <Method
                                methodName={ methodKey }
                                key={ methodKey }
                                onSelect={ () => this.props.selectService(`${ namespaceKey }.${ methodKey }`) }
                                selected={ this.props.selectedService === `${ namespaceKey }.${ methodKey }` }
                            />
                        )) }
                    </Namespace>
                )) }
                
                { !isEmpty(this.props.otherMethods) &&
                    <Namespace namespaceName="other">
                        { map(this.props.otherMethods, (method, methodKey) => (
                            <Method
                                methodName={ methodKey }
                                key={ methodKey }
                                onSelect={ () => this.props.selectService(methodKey) }
                                selected={ this.props.selectedService === methodKey }
                            />
                        )) }
                    </Namespace>
                }
            </div>
        )
    }
}
