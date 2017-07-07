import React from 'react';
import { Table, Tabs, Tab, Alert } from 'react-bootstrap';
import bemCl from 'bem-cl';
import map from 'lodash/map';

import ParamsTable from 'components/ParamsTable';

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
        
        return <ParamsTable schema={this.props.schema} />
    }
    
    renderOutputTable() {
        return (
            <div className={b('output-tables')}>
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
            </div>
        );
    }
    
    renderErrorsTableIfNeeded() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Error code</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    map(this.props.schema.errors, (errorDescription, errorCode) => {
                        return (
                            <tr key={errorCode}>
                                <td>{errorCode}</td>
                                <td>{errorDescription}</td>
                            </tr>
                        );
                    })
                }
                
                </tbody>
            </Table>
        );
    }
    
    renderOutputParamsIfNeeded() {
        if (!this.props.schema.returns || !this.props.schema.returns.type) {
            return (
                <Alert bsStyle="warning">
                    No output specified in documentation
                </Alert>
            );
        }
        return (
            <div className={b('output')}>
                <h4>Returns:</h4>
                { this.renderOutputTable() }
                
                {
                    this.props.schema.returns.definitions &&
                    map(this.props.schema.returns.definitions, (definition, definitionKey) => {
                        return (
                            <div key={definitionKey}>
                                <h5>Definition of {definitionKey}</h5>
                                <ParamsTable schema={definition}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    
    render() {
        if (!this.props.schema || !this.props.schema.properties) return null;
        
        return (
            <div className={b()}>
                <h5>{this.props.schema.description}</h5>
    
                <Tabs
                    defaultActiveKey={1}
                    id="method-viewer-tabs"
                >
                    <Tab eventKey={1} title="Input">
                        { this.renderInputParamsTableIfNeeded() }
                    </Tab>
                    <Tab eventKey={2} title="Output">
                        { this.renderOutputParamsIfNeeded() }
                    </Tab>
                    {
                        this.props.schema.errors && (
                            <Tab eventKey={3} title="Error codes">
                                { this.renderErrorsTableIfNeeded() }
                            </Tab>
                        )
                    }
                </Tabs>
                
            </div>
        )
    }
}

export default MethodDescription;
