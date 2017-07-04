import React from 'react'
import bem from 'bem-cl';
import { FormControl, Form, FormGroup, Button } from 'react-bootstrap';
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
                <div className={ b.createProject('step') }>
                    <Form horizontal>
                        <FormGroup>
                            <FormControl
                                placeholder="SMD file URL"
                                onChange={ (e) => this.setState({ smdUrl: e.nativeEvent.target.value }) }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" onClick={ this.onSubmit.bind(this) }>
                                Upload
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}
