import React from 'react'
import bem from 'bem-cl';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { FormControl, Form, FormGroup, Button, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Project.scss';

const b = {
    createProject: bem('app-create-project')
};

const modes = {
    INIT: 'init',
    SETTINGS: 'settings'
};

export default class extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            smdUrl: this.props.project.smdUrl || '',
            endpoint: this.props.project.endpoint || '',
            headers: map(this.props.project.headers, (value = '', key = '') => ({ key, value }))
        };
    }
    
    static defaultProps = {
        onSubmit: () => {}
    };
    
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
        this.props.onSubmit();
    }
    
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
        const { mode } = this.props;
        return (
            <div className={ b.createProject() }>
                { mode !== modes.SETTINGS &&
                    <div>
                        <h3>SMD scheme *</h3>
                        <FormGroup>
                            <FormControl
                                onChange={ (e) => this.setState({ smdUrl: e.nativeEvent.target.value }) }
                                value={ this.state.smdUrl }
                            />
                        </FormGroup>
                    </div>
                }
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
                        value={ this.state.endpoint }
                    />
                </FormGroup>
                <FormGroup>
                    <Button bsStyle={ mode === modes.SETTINGS ? "primary" : "success" } type="submit" onClick={ this.onSubmit.bind(this) }>
                        { mode === modes.SETTINGS ? "Update" : "Create" }
                    </Button>
                </FormGroup>
            </div>
        )
    }
}
