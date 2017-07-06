import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, Button, Alert } from 'react-bootstrap';
import bemCl from 'bem-cl';
import { getParamsTemplateFromSchema } from 'helpers/SMDToJSONSchema';

import './RawJsonEditor.scss';

const b = bemCl('sb-raw-json-editor');

class RawJsonEditor extends React.PureComponent {
   
    state = { value: '', valid: true};
    
    static propTypes = {
        schema: PropTypes.object,
        onSubmit: PropTypes.func
    };
    
    static defaultProps = {
        schema: null,
        onSubmit: () => {}
    };
    
    /* REACT LIFECYCLE */
    componentWillMount() {
        this.setState({value: this.getTextValue()})
    }
    
    componentWillUnmount() {
        this.saveValueSafe();
    }
    
    
    /* HANDLERS */
    
    handleInputChange = (event) => {
        this.setState({value: event.target.value} , () => {
            this.validate();
        });
    };
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.saveValueSafe();
    
        const jsonFull = this.validate(true);
        if (jsonFull){
            this.props.onSubmit(jsonFull);
        }
    }
    
    validate = (getFullJson = false) => {
        try {
            const jsonObject = JSON.parse(this.state.value);
            this.setState({valid: true});
            if (getFullJson) return jsonObject;
            
            return jsonObject.params || {};
        } catch (err) {
            this.setState({valid: false});
            return false;
        }
    };
    
    saveValueSafe(){
        const finalString = this.validate();
        if (finalString){
            this.props.onChange(finalString);
        }
    }
    
    
    getJSONFromSchema() {
        return getParamsTemplateFromSchema(this.props.method, this.props.schema, this.props.formData);
    }
    
    getTextValue() {
        const rawJson = this.getJSONFromSchema();
        return JSON.stringify(rawJson, null, 2);
    }
    
    render() {
        if (!this.props.schema) return null;
        return (
            <div className={b()}>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error && (
                            <Alert bsStyle="danger">
                                Invalid JSON
                            </Alert>
                        )
                    }
                    <FormGroup validationState={this.state.valid ? 'success' : 'error'}>
                        <FormControl
                            className={b('textarea')}
                            componentClass="textarea"
                            onChange={this.handleInputChange}
                            value={this.state.value}
                            placeholder="Enter raw JSON"
                        />
                    </FormGroup>
                    <Button type="submit" bsStyle="success">
                        Try
                    </Button>
                </form>
            </div>
        );
    }
}

export default RawJsonEditor;
