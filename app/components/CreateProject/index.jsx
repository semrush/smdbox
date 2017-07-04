import React from 'react'
import bem from 'bem-cl';
import { Input, Form, Button } from 'antd';
import './styles.scss';

const b = {
    createProject: bem('app-create-project')
};

export default class extends React.Component {
    
    onSubmit(e) {
        console.log(this.state.smdUrl);
        e.preventDefault()
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
                    <Form layout="horizontal" onSubmit={ this.onSubmit.bind(this) }>
                        <Form.Item>
                            <Input
                                size="large"
                                placeholder="SMD file URL"
                                onChange={ (e) => this.setState({ smdUrl: e.nativeEvent.target.value }) }
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit">Upload</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
