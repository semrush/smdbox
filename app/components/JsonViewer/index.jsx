import React from 'react';
import PropTypes from 'prop-types';

import bemCl from 'bem-cl';
import JSONTree from 'react-json-tree'
import theme from './theme';

const b = bemCl('sb-json-viewer');


class JsonViewer extends React.PureComponent {
    static propTypes = {
        json: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };
    static defaultProps = {
        json: {}
    };
    
    render() {
        return (
            <div className={b()}>
                <JSONTree data={this.props.json} theme={theme} />
            </div>
        );
    }
}


export default JsonViewer;
