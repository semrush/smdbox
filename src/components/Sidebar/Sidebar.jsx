import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

import Namespace from './Namespace';
import Method from './Method';

import './Sidebar.scss';


class Sidebar extends React.Component {
    static propTypes = {
        namespacedMethods: PropTypes.object,
        otherMethods: PropTypes.object,
        selectService: PropTypes.func.isRequired,
        selectedService: PropTypes.string
    };

    static defaultProps = {
        namespacedMethods: {},
        otherMethods: {},
        selectedService: null
    };

    state = {
        search: '',
    };

    filter(methods, namespace) {
        const searchString = this.state.search.toLowerCase();
        if (namespace && namespace.toLowerCase().indexOf(searchString) !== -1) {
            return methods;
        }
        return reduce(methods, (res, value, key) => {
            const combinedKey = [namespace, key].filter(Boolean).join('.').toLowerCase();
            if (combinedKey.indexOf(searchString) !== -1) { res[key] = value; }
            return res;
        }, {});
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
                                onChange={e => this.setState({ search: e.nativeEvent.target.value })}
                                value={this.state.search}
                                placeholder="Methods search"
                            />
                        </InputGroup>
                    </FormGroup>
                </div>
                { map(this.props.namespacedMethods, (namespace, namespaceKey) => (
                    <Namespace namespaceName={namespaceKey} key={namespaceKey}>
                        { map(this.filter(namespace, namespaceKey), (method, methodKey) => (
                            <Method
                                methodName={methodKey}
                                key={methodKey}
                                onSelect={() => this.props.selectService(`${namespaceKey}.${methodKey}`)}
                                selected={this.props.selectedService === `${namespaceKey}.${methodKey}`}
                            />
                        )) }
                    </Namespace>
                )) }

                { !isEmpty(this.props.otherMethods) &&
                <Namespace>
                    { map(this.filter(this.props.otherMethods), (method, methodKey) => (
                        <Method
                            methodName={methodKey}
                            key={methodKey}
                            onSelect={() => this.props.selectService(methodKey)}
                            selected={this.props.selectedService === methodKey}
                        />
                    )) }
                </Namespace>
                }
            </div>
        );
    }
}

export default Sidebar;
