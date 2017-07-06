import React from 'react';
import { Table, Tabs, Tab, Alert } from 'react-bootstrap';
import bemCl from 'bem-cl';
import './MethodDescription.scss';

const b = bemCl('sb-method-description');

class MethodDescription extends React.PureComponent{
    
    resolveType(type, parent) {
        if (type === 'array'){
            return `[ ]${parent.items.type || ''}`;
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
    
    renderInputParamsTableIfNeeded() {
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
    
    
    renderOutputParamsIfNeeded() {
        let showDefinitions = false;
        let responseType;
        if (this.props.schema.returns.type === 'array' &&
            this.props.schema.returns.items &&
            this.props.schema.returns.items.$ref) {
            responseType = this.props.schema.returns.items.$ref.split("/").pop();
            
            if (this.props.schema.returns.definitions &&
                this.props.schema.returns.definitions[responseType]) {
                showDefinitions = this.props.schema.returns.definitions[responseType];
            }
        } else if (this.props.schema.returns.type === 'object'
            && this.props.schema.returns.properties) {
            responseType = this.props.schema.returns.description || 'returned object';
            showDefinitions = this.props.schema.returns;
        }
        
        return (
            <div className={b('output')}>
                <h4>Returns:</h4>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Type</th>
                        {
                            this.props.schema.returns.description && (
                                <th>Description</th>
                            )
                        }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.props.schema.returns.type}</td>
                        {
                            this.props.schema.returns.description && (
                                <td>{this.props.schema.returns.description}</td>
                            )
                        }
                        
                    </tr>
                    </tbody>
                </Table>
                
                {
                    showDefinitions && (
                        <div>
                            <h5>Definition of {responseType}</h5>
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
                                    Object.keys(showDefinitions.properties).map(
                                        param => this.renderParam(param, showDefinitions.properties)
                                    )
                                }
                                </tbody>
                            </Table>
                        </div>
                    )
                }
            </div>
        )
    }
    
    render() {
        if (!this.props.schema || !this.props.schema.properties) return null;
        
        return (
            <div className={b()}>
                <h4>{this.props.schema.description}</h4>
    
                <Tabs
                    defaultActiveKey={1}
                    id="uncontrolled-tab-example"
                >
                    <Tab eventKey={1} title="Input">
                        { this.renderInputParamsTableIfNeeded() }
                    </Tab>
                    <Tab eventKey={2} title="Output">
                        { this.renderOutputParamsIfNeeded() }
                    </Tab>
                </Tabs>
                
            </div>
        )
    }
}

export default MethodDescription;
