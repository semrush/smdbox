import React from 'react';
import PropTypes from 'prop-types';

const Namespace = ({ namespaceName, children }) => {
    if (children.length === 0) return null;
    
    return (
        <div className="sb-sidebar__namespace">
            { namespaceName && <div className="h4">{ namespaceName }</div> }
            <ul className="nav nav-pills nav-stacked">
                { children }
            </ul>
        </div>
    );
};

Namespace.propTypes = {
    namespaceName: PropTypes.string,
    children: PropTypes.any
};

Namespace.defaultProps = {
    namespaceName: '',
};

export default Namespace;
