import React from 'react';
import bem from 'bem-cl';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import debounce from 'lodash/debounce';
import { FormControl, Form, FormGroup, Button, Glyphicon } from 'react-bootstrap';
import './Project.scss';

const b = {
    createProject: bem('app-create-project')
};

const modes = {
    INIT: 'init',
    SETTINGS: 'settings'
};

class Project extends React.Component {

    static propTypes = {
        endpoint: PropTypes.string,
        fetchSmd: PropTypes.func.isRequired,
        headers: PropTypes.object.isRequired,
        smdScheme: PropTypes.object,
        onSubmit: PropTypes.func,
        fetchingSchema: PropTypes.bool.isRequired,
        fetchingSmdError: PropTypes.bool,
        create: PropTypes.func.isRequired,
        smdUrl: PropTypes.string,
        mode: PropTypes.oneOf([modes.INIT, modes.SETTINGS])
    };

    static defaultProps = {
        onSubmit: () => {},
        fetchingSmdError: false,
        smdScheme: null,
        endpoint: '',
        smdUrl: '',
        mode: modes.INIT
    };

    constructor(props) {
        super(props);

        this.state = {
            endpoint: this.props.endpoint || '',
            smdUrl: this.props.smdUrl || '',
            headers: map(this.props.headers, (value = '', key = '') => ({ key, value }))
        };

        this.fetchSmd = debounce(this.fetchSmd.bind(this), 800);

        // if endpoint is set initially - preload scheme
        if (this.state.endpoint !== '' && !props.created) {
            this.fetchSmd(this.state.smdUrl);
        }
    }


    UNSAFE_componentWillReceiveProps({ endpoint, smdUrl }) { // eslint-disable-line
        if (endpoint !== this.props.endpoint) {
            this.setState({ endpoint });
        }
        if (smdUrl !== this.props.smdUrl) {
            this.setState({ smdUrl });
        }
    }

    fetchSmd(url, isRefresh = false) {
        this.props.fetchSmd(url, isRefresh);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.create({
            endpoint: this.state.endpoint,
            smdUrl: this.state.smdUrl,
            headers: reduce(this.state.headers, (res, header) => {
                if (header.key && header.value) { res[header.key] = header.value; }
                return res;
            }, {})
        });
        this.props.onSubmit();
    };

    onRefresh = () => {
        this.fetchSmd(this.props.smdUrl, true);
    };

    addHeader() {
        this.setState({ headers: [...this.state.headers, { key: '', value: '' }] });
    }

    removeHeader(index) {
        this.setState({ headers: [
            ...this.state.headers.slice(0, index),
            ...this.state.headers.slice(index + 1)
        ] });
    }

    getFormValidationState = () => {
        if (this.props.fetchingSmdError) return 'error';

        if (this.props.smdScheme !== null) return 'success';

        return null;
    }

    handleChangeUrl = (e) => {
        this.setState({ smdUrl: e.nativeEvent.target.value }, () => {
            this.fetchSmd(this.state.smdUrl);
        });
    }

    handleChangeHeaderName = (index, value) => {
        this.setState({
            headers: map(this.state.headers, (header, headerIndex) => {
                if (headerIndex === index) {
                    return {
                        ...header,
                        key: value
                    };
                } return header;
            })
        });
    };

    handleChangeHeaderValue = (index, value) => {
        this.setState({
            headers: map(this.state.headers, (header, headerIndex) => {
                if (headerIndex === index) {
                    return {
                        ...header,
                        value
                    };
                } return header;
            })
        });
    };

    render() {
        const { mode } = this.props;
        return (
            <div className={b.createProject()}>
                { mode !== modes.SETTINGS &&
                    <div>
                        <h4>SMD scheme *
                        {
                            this.props.fetchingSchema && <span className={b.createProject('loading')}> <i className="glyphicon glyphicon-refresh" /></span>
                        }
                        </h4>
                        <FormGroup validationState={this.getFormValidationState()}>
                            <FormControl
                                placeholder="Enter SMD scheme url"
                                value={this.state.smdUrl}
                                onChange={this.handleChangeUrl}
                            />
                        </FormGroup>
                    </div>
                }
                <h4>Custom headers</h4>
                { map(this.state.headers, (header, index) => (
                    <FormGroup key={`header-${index}`}>
                        <Form inline>
                            <FormGroup>
                                <FormControl
                                    placeholder="Key"
                                    value={header.key}
                                    onChange={(e) => {
                                        this.handleChangeHeaderName(index, e.nativeEvent.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    placeholder="Value" value={header.value} onChange={(e) => {
                                        this.handleChangeHeaderValue(index, e.nativeEvent.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button bsStyle="warning" onClick={() => this.removeHeader(index)}>
                                    <Glyphicon glyph="remove" />
                                </Button>
                            </FormGroup>
                        </Form>
                    </FormGroup>
                )) }
                <FormGroup>
                    <Button onClick={() => { this.addHeader(); }}>Add header</Button>
                </FormGroup>
                <h4>API endpoint for test</h4>
                <FormGroup>
                    <FormControl
                        placeholder="Enter endpoint url"
                        onChange={e => this.setState({ endpoint: e.nativeEvent.target.value })}
                        value={this.state.endpoint}
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        bsStyle={mode === modes.SETTINGS ? 'primary' : 'success'}
                        type="submit"
                        onClick={this.onSubmit}
                        disabled={this.props.smdScheme === null || this.props.fetchingSmdError}
                    >
                        { mode === modes.SETTINGS ? 'Update' : 'Create' }
                    </Button>
                    {
                        mode === modes.SETTINGS && (
                            <Button
                                bsStyle={'default'}
                                type="button"
                                onClick={this.onRefresh}
                                disabled={this.props.smdScheme === null || this.props.fetchingSchema}
                            >
                                { this.props.fetchingSchema ? '...Refreshing...' : 'Refresh SMD schema' }
                            </Button>
                        )
                    }

                </FormGroup>
            </div>
        );
    }
}

export default Project;
