import React from 'react'
import bem from 'bem-cl';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { FormControl, Form, FormGroup, Button, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Project.scss';

const b = {
    createProject: bem('app-create-project')
};

export default class extends React.Component {
    
    onSubmit(e) {
        e.preventDefault();
        this.props.create({
            smdUrl: this.state.smdUrl,
            endpoint: this.state.endpoint,
            headers: reduce(this.state.headers, (res, header) => {
                if (header.key && header.value) { res[header.key] = header.value }
                return res
            }, {})
        });
    }
    
    state = {
        smdUrl: null,
        endpoint: null,
        headers: []
    };
    
    addHeader() {
        this.setState({ headers: [ ...this.state.headers, { key: '', value: '' } ] })
    }
    
    removeHeader(index) {
        this.setState({ headers: [
            ...this.state.headers.slice(0, index),
            ...this.state.headers.slice(index + 1)
        ] });
    }
    
    render() {
        return (
            <div className={ b.createProject() }>
                <div className={ b.createProject('step') }>
                    <h3>SMD scheme *</h3>
                    <FormGroup>
                        <FormControl
                            onChange={ (e) => this.setState({ smdUrl: e.nativeEvent.target.value }) }
                        />
                    </FormGroup>
                    <h3>Custom headers</h3>
                    { map(this.state.headers, (header, index) => (
                        <FormGroup key={ `header-${index}` }>
                            <Form inline>
                                <FormGroup>
                                    <FormControl placeholder="Key" value={ header.key } onChange={ (e) => {
                                        this.setState({
                                            headers: map(this.state.headers, (header, headerIndex) => {
                                                if (headerIndex === index) {
                                                    return { ...header, key: e.nativeEvent.target.value }
                                                } else { return header }
                                            })
                                        })
                                    } } />
                                </FormGroup>
                                <FormGroup>
                                    <FormControl placeholder="Value" value={ header.value } onChange={ (e) => {
                                        this.setState({
                                            headers: map(this.state.headers, (header, headerIndex) => {
                                                if (headerIndex === index) {
                                                    return { ...header, value: e.nativeEvent.target.value }
                                                } else { return header }
                                            })
                                        })
                                    } } />
                                </FormGroup>
                                <FormGroup>
                                    <Button bsStyle="warning" onClick={ () => this.removeHeader(index) }>
                                        <Glyphicon glyph="remove" />
                                    </Button>
                                </FormGroup>
                            </Form>
                        </FormGroup>
                    )) }
                    <FormGroup>
                        <Button onClick={ () => { this.addHeader() } }>Add header</Button>
                    </FormGroup>
                    <h3>API endpoint for test</h3>
                    <FormGroup>
                        <FormControl
                            onChange={ (e) => this.setState({ endpoint: e.nativeEvent.target.value }) }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button bsStyle="success" type="submit" onClick={ this.onSubmit.bind(this) }>
                            Create
                        </Button>
                    </FormGroup>
                </div>
            </div>
        )
    }
}
