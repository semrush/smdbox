import React from 'react';
import PropTypes from 'prop-types';

import bemCl from 'bem-cl';
import Form from "react-jsonschema-form";

import './FormFromSchema.scss';

const b = bemCl('sb-form-from-schema');

class FormFromSchema extends React.PureComponent {
   
    static propTypes = {
        schema: PropTypes.object,
        onSubmit: PropTypes.func
    };
    
    static defaultProps = {
        schema: null,
        onSubmit: () => {}
    };
    
    render() {
        if (!this.props.schema) return null;
        
        return (
            <div className={b()}>
                <Form
                    schema={this.props.schema}
                    onSubmit={this.props.onSubmit}
                >
                </Form>
                {
                    this.props.loading  ? <div>...Loading...</div> : null
                }
            </div>
        );
    }
}

export default FormFromSchema;
