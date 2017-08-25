import React from 'react'
import bem from 'bem-cl';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import debounce from 'lodash/debounce';
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
            endpoint: this.props.endpoint || '',
            headers: map(this.props.headers, (value = '', key = '') => ({ key, value }))
        };
    
        this.fetchSmd = debounce(this.fetchSmd.bind(this), 800);
    }
    
    static defaultProps = {
        onSubmit: () => {}
    };
    
    componentWillReceiveProps({ endpoint }) {
        if (endpoint !== this.props.endpoint) {
            this.setState({ endpoint });
        }
    }
    
    fetchSmd(url) {
        this.props.fetchSmd(url);
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.create({
            endpoint: this.state.endpoint,
            headers: reduce(this.state.headers, (res, header) => {
                if (header.key && header.value) { res[header.key] = header.value }
                return res
            }, {})
        });
        this.props.onSubmit();
    };
    
    onRefresh = () => {
        this.fetchSmd(this.props.smdUrl);
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
        const { mode } = this.props;
        return (
            <div className={ b.createProject() }>
                { mode !== modes.SETTINGS &&
                    <div>
                        <h4>SMD scheme *</h4>
                        <FormGroup validationState={ this.props.fetchingSmdError ? 'error' : this.props.smdScheme !== null ? 'success' : null }>
                            <FormControl
                                placeholder="Enter SMD scheme url"
                                disabled={ this.props.fetchingSchema }
                                onChange={ (e) => { e.persist(); this.fetchSmd(e.nativeEvent.target.value) } }
                            />
                        </FormGroup>
                    </div>
                }
                <h4>Custom headers</h4>
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
                <h4>API endpoint for test</h4>
                <FormGroup>
                    <FormControl
                        placeholder="Enter endpoint url"
                        onChange={ (e) => this.setState({ endpoint: e.nativeEvent.target.value }) }
                        value={ this.state.endpoint }
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        bsStyle={ mode === modes.SETTINGS ? "primary" : "success" }
                        type="submit"
                        onClick={ this.onSubmit }
                        disabled={ this.props.smdScheme === null }
                    >
                        { mode === modes.SETTINGS ? "Update" : "Create" }
                    </Button>
                    {
                        mode === modes.SETTINGS && (
                            <Button
                                bsStyle={ "default" }
                                type="button"
                                onClick={ this.onRefresh }
                                disabled={ this.props.smdScheme === null || this.props.fetchingSchema}
                            >
                                { this.props.fetchingSchema ? "...Refreshing..." : "Refresh SMD schema" }
                            </Button>
                        )
                    }
                    
                </FormGroup>
            </div>
        )
    }
}
