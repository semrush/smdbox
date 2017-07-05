import React from 'react';
import PropTypes from 'prop-types';

import bemCl from 'bem-cl';
import JSONTree from 'react-json-tree'

const b = bemCl('sb-json-viewer');

class JsonViewer extends React.PureComponent {
    static propTypes = {
        json: PropTypes.object
    };
    static defaultProps = {
        json: {}
    };
    
    render() {
        return (
            <div className={b()}>
               <JSONTree data={this.props.json} />
            </div>
        );
    }
}


export default JsonViewer;
