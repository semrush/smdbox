import React from 'react';
import { Table } from 'react-bootstrap';
    
class MethodDescription extends React.PureComponent{
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
                        Object.keys(this.props.schema.properties).map(param => {
                                return (
                                    <tr key={param}>
                                        <td>
                                            {param}
                                        </td>
                                        <td>
                                            {this.props.schema.properties[param].description || '--'}
                                        </td>
                                        <td>
                                            {this.props.schema.properties[param].type}
                                        </td>
                                        <td>
                                            {this.props.schema.properties[param].optional ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </Table>
                
                
            </div>
        )
    }
}

export default MethodDescription;
