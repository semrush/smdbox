import React from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import './Sidebar.scss';

const Namespace = ({ namespaceName, children }) => {
    if (children.length === 0) return null;
    
    return (
        <div className="sb-sidebar__namespace">
            { namespaceName && <div className="h4">{ namespaceName }</div> }
            <ul className="nav nav-pills nav-stacked">
                { children }
            </ul>
        </div>
    )
};

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
    
    state = {
        search: ''
    };
    
    filter(methods) {
        return reduce(methods, (res, value, key) => {
            if (key.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) { res[key] = value; }
            return res;
        }, {})
    }
    
    render() {
        
        return (
            <div className="sb-sidebar">
                <div className="sb-sidebar__search">
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Glyphicon glyph="search" />
                            </InputGroup.Addon>
                            <FormControl
                                type="text"
                                autoFocus
                                onChange={ (e) => this.setState({ search: e.nativeEvent.target.value }) }
                                value={ this.state.search }
                                placeholder="Methods search"
                            />
                        </InputGroup>
                    </FormGroup>
                </div>
                { map(this.props.namespacedMethods, (namespace, namespaceKey) => (
                    <Namespace namespaceName={ namespaceKey } key={ namespaceKey }>
                        { map(this.filter(namespace), (method, methodKey) => (
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
                    <Namespace>
                        { map(this.filter(this.props.otherMethods), (method, methodKey) => (
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
