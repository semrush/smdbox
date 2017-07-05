import React from 'react';
import { Table, Tabs, Tab, Alert } from 'react-bootstrap';
import bemCl from 'bem-cl';
import './MethodDescription.scss';

const b = bemCl('sb-method-description');

class MethodDescription extends React.PureComponent{
    
    resolveType(type, parent) {
        if (type === 'array'){
            return `[ ]${parent.items.type}`;
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
                    {parent[param].optional ? 'No' : 'Yes'}
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
    
    renderTableIfNeeded() {
        if (!Object.keys(this.props.schema.properties).length) {
            return (
                <Alert bsStyle="warning">
                    No input properties specified in documentation
                </Alert>
            )
        }
        
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Param</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Required</th>
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
        )
    }
    
    render() {
        if (!this.props.schema || !this.props.schema.properties) return null;
        
        return (
            <div className={b()}>
                <h2>{this.props.method}</h2>
                <h4>{this.props.schema.description}</h4>
    
                <Tabs
                    defaultActiveKey={1}
                    id="uncontrolled-tab-example"
                >
                    <Tab eventKey={1} title="Input">
                        {
                            this.renderTableIfNeeded()
                        }
                    </Tab>
                    <Tab eventKey={2} title="Output">
                        
                    </Tab>
                </Tabs>
                
            </div>
        )
    }
}

export default MethodDescription;
