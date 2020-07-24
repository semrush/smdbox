import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import bemCl from 'bem-cl';
import './CrashScreen.scss';
const b = bemCl('sb-crashscreen');

class CrashScreen extends React.Component {
    static propTypes = {
        clearProject: PropTypes.func.isRequired,
    }
    onReset = () => {
        this.props.clearProject();
    }
    render() {
        return (
            <div className={b()}>
                <h1>OOPS! Everything crashed</h1>
                <h2>No one knows why</h2>
                <h3>Fortunately, you have this magic button</h3>
                <p>
                    <br />
                    <Button bsSize="large" type="submit" bsStyle="success" onClick={this.onReset}>
                        Clear project cache and restart
                    </Button>
                </p>
            </div>
        );
    }
}

export default CrashScreen;
