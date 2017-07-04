import React from 'react';
import { Table } from 'react-bootstrap';
    
class MethodDescription extends React.PureComponent{
    
    resolveType(type, parent) {
        if (type === 'array'){
            return `[ ] ${parent.items.type}`;
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
                    {parent[param].optional ? 'Yes' : 'No'}
                </td>
            </tr>
        );
        
        
        if (parent[param].properties) {
            Object.keys(parent[param].properties).forEach(
                nestedParam => {
                    rows.push(
                        this.renderParam(
                            nestedParam,
                            parent[param].properties,
                            namespace ? `${namespace}.${param}` : param
                        )
                    )
                }
            )
        }
        
        return rows;
    }
    
    render() {
        if (!this.props.schema || !this.props.schema.properties) return null;
        
        return (
            <div>
                <h2>{this.props.schema.description}</h2>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Param</th>
                        <th>Description</th>
                        <th>type</th>
                        <th>Optional</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(this.props.schema.properties).map(
                            param => this.renderParam(param, this.props.schema.properties)
                        )
                    }
                    </tbody>
                </Table>
                
                
            </div>
        )
    }
}

export default MethodDescription;
