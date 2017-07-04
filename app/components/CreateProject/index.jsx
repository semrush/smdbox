import React from 'react'
import bem from 'bem-cl';
import { FormControl } from 'react-bootstrap';
import './CreateProject.scss';

const b = {
    createProject: bem('app-create-project')
};

export default class extends React.Component {
    
    onSubmit(e) {
        e.preventDefault();
        this.props.upload(this.state.smdUrl);
    }
    
    state = {
        smdUrl: null
    };
    
    render() {
        return (
            <div className={ b.createProject() }>
                <h2 className={ b.createProject('header') }>Getting started</h2>
                <div className={ b.createProject('step') }>
                    <h3 className={ b.createProject('step-header') }>Upload your SMD</h3>
                    <FormControl
                        size="large"
                        placeholder="SMD file URL"
                        bsSize="lg"
                        onChange={ (e) => this.setState({ smdUrl: e.nativeEvent.target.value }) }
                    />
                </div>
            </div>
        )
    }
}
