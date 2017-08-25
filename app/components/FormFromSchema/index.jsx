import React from 'react';
import PropTypes from 'prop-types';

import bemCl from 'bem-cl';
import Form from "react-jsonschema-form";
import { Button } from 'react-bootstrap';

import './FormFromSchema.scss';

const b = bemCl('sb-form-from-schema');

class FormFromSchema extends React.PureComponent {
   
    static propTypes = {
        schema: PropTypes.object,
        formData: PropTypes.object,
        onSubmit: PropTypes.func
    };
    
    static defaultProps = {
        schema: null,
        formData: {},
        onSubmit: () => {}
    };
    
    handleFormChange = (data) => {
        this.props.onChange(data.formData);
    };
    
    handleError = (error) => {
        console.log(error);
    };
    
    render() {
        if (!this.props.schema) return null;
        return (
            <div className={b()}>
                <Form
                    schema={this.props.schema}
                    formData={this.props.formData}
                    onChange={this.handleFormChange}
                    onSubmit={this.props.onSubmit}
                    onError={this.handleError}
                >
                    <Button type="submit" bsStyle="success">
                        Try
                    </Button>
                </Form>
            </div>
        );
    }
}

export default FormFromSchema;
