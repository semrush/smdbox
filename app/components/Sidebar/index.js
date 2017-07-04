import React from 'react';
import map from 'lodash/map'

export default class extends React.Component {
    
    render() {
        
        return (
            <ul>
                { map(this.props.namespacedMethods, (namespace, namespaceKey) => (
                    <li key={ namespaceKey }>
                        { namespaceKey }
                        <ul>
                            { map(namespace, (method, methodKey) => (
                                <li key={ methodKey }>{ methodKey }</li>
                            )) }
                        </ul>
                    </li>
                )) }
            </ul>
        )
    }
}
