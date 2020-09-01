import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ text }) => {
  return (
    <h2>{text}</h2>
  );
};
Header.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Header;