import React from 'react';
import bemCl from 'bem-cl';
import { Grid, Col, Row } from 'react-bootstrap';

import JsonViewer from 'components/JsonViewer';

import './History.scss';

const b = bemCl('sb-history');

class History extends React.PureComponent {
    
    renderListItem = (item) => {
        return (
            <li
                key={item.id}
                onClick={()=> {this.props.selectItem(item)} }
                className={(this.props.selectedItem && this.props.selectedItem.id === item.id) ? 'active' : '' }
            >
                <a onClick={ (e) => e.nativeEvent.preventDefault() }>{ item.method }</a>
            </li>
        );
    };
    
    renderSelectedItem = () => {
        if (!this.props.selectedItem) return null;
        return (
            <JsonViewer json={this.props.selectedItem.response} />
        )
    };
    
    render() {
        return (
            <div className={b()}>
                <Row>
                    <Col md={3}>
                        <ul className="nav nav-pills nav-stacked">
                            {
                                this.props.items.map(historyItem => {
                                    return this.renderListItem(historyItem);
                                })
                            }
                        </ul>
                    </Col>
                    <Col md={9}>
                        {
                            this.renderSelectedItem()
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default History;
