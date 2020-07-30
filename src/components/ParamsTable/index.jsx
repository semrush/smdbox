import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';

class ParamsTable extends React.PureComponent {
    static propTypes = {
        schema: PropTypes.object
    }

    static defaultProps = {
        schema: {
            properties: {}
        }
    }

    resolveDefinitionName = (def) => {
        return def.split('/').pop();
    }
    resolveType(type, parent) {
        if (type === 'array') {
            return `[ ]${parent.items.type || this.resolveDefinitionName(parent.items.$ref) || ''}`;
        }

        if (type === 'object' && parent.$ref) {
            return parent.$ref.split('/').pop();
        }

        return type;
    }

    renderParam(param, parent, namespace = '') {
        const rows = [];

        rows.push(
            <tr key={namespace ? `${namespace}.${param}` : param}>
                <td>
                    <b>{namespace ? `${namespace}.${param}` : param}</b>
                </td>
                <td>
                    {parent[param].description || '--'}
                </td>
                <td>
                    {this.resolveType(parent[param].type, parent[param])}
                </td>
                <td>
                    {parent[param].optional ? '' : <i className="required-icon glyphicon glyphicon-ok" /> }
                </td>
            </tr>
        );


        if (parent[param].properties) {
            Object.keys(parent[param].properties).forEach(
                (nestedParam) => {
                    rows.push(
                        this.renderParam(
                            nestedParam,
                            parent[param].properties,
                            namespace ? `${namespace}.${param}` : param
                        )
                    );
                }
            );
        }

        return rows;
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Required</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.schema && this.props.schema.properties && Object.keys(this.props.schema.properties).map(
                            param => this.renderParam(param, this.props.schema.properties)
                        )
                    }
                </tbody>
            </Table>
        );
    }
}

export default ParamsTable;
