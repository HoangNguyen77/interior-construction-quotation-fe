import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const MyComponent = ({ htmlContent }) => {
    return <div>{parse(htmlContent)}</div>;
}

MyComponent.propTypes = {
    htmlContent: PropTypes.string.isRequired
};

export default MyComponent;

