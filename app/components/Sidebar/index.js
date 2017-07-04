import React from 'react';

export default class extends React.Component {
    
    render() {
        return (
            <ul className="nav nav-pills nav-stacked">
                <li className="active">
                    <a href="">profile</a>
                    <ul>
                        <li>Get</li>
                        <li>Feed</li>
                        <li>Friends</li>
                    </ul>
                </li>
                <li><a href="">shows</a></li>
                <li><a href="">list</a></li>
            </ul>
        )
    }
}
