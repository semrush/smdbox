import React from 'react';
import PropTypes from 'prop-types';

import bemCl from 'bem-cl';
import SForm from "react-jsonschema-form";

import './FormFromSchema.scss';

const b = bemCl('sb-form-from-schema');

class FormFromSchema extends React.PureComponent {
   
    static propTypes = {
        schema: PropTypes.object
    };
    
    static defaultProps = {
        schema: null
    };
    
    render() {
        if (!this.props.schema) return null;
        
        return (
            <div className={b()}>
                <SForm
                    schema={this.props.schema}
                >
                </SForm>
            </div>
        );
    }
}

export default FormFromSchema;
