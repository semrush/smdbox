import React from 'react';
import PropTypes from 'prop-types';

import bemCl from 'bem-cl';
import JSONTree from 'react-json-tree';
import { Tabs, Tab, Button, FormControl } from 'react-bootstrap';
import copy from 'copy-to-clipboard';
import theme from './theme';
import './JsonViewer.scss';

const b = bemCl('sb-json-viewer');


class JsonViewer extends React.PureComponent {
    static propTypes = {
        json: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };
    static defaultProps = {
        json: {}
    };
    
    getRawJson() {
        try {
            return JSON.stringify(this.props.json, null, 2);
        } catch(err){
            return "";
        }
    }
    
    copyToClipboard = () => {
        copy(this.getRawJson());
    };

    render() {
        return (
            <div className={b()}>
                <h3>
                    Result
                    <div className={b('clipboard-button')}>
                        <Button bsSize="xsmall" onClick={this.copyToClipboard}>Copy to clipboard</Button>
                    </div>
                </h3>
                <Tabs
                    defaultActiveKey={1}
                    id="json-viewer-tabs"
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <Tab eventKey={1} title="Formatted">
                        <JSONTree data={this.props.json} theme={theme} />
                    </Tab>
                    <Tab eventKey={2} title="Raw">
                        <div className={b('raw')}>
                            <FormControl
                                className={b('textarea').toString()}
                                componentClass="textarea"
                                disabled
                                value={this.getRawJson()}
                                placeholder="Raw JSON"
                            />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}


export default JsonViewer;
