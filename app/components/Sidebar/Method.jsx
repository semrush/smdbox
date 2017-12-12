import React from 'react';
import PropTypes from 'prop-types';

const Method = ({ methodName, selected, onSelect }) => {
    return (
        <li
            onClick={onSelect}
            className={selected ? 'active' : ''}
        >
            <a href="" onClick={e => e.nativeEvent.preventDefault()}>{ methodName }</a>
        </li>
    );
};

Method.propTypes = {
    methodName: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default Method;
