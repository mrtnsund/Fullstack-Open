import React from 'react';
import PropTypes from 'prop-types';

const LoginInfo = ({ username, logout }) => {
  return (
    <p>
      logged in as {username}{' '}
      <button onClick={logout}>logout</button>{' '}
    </p>
  );
};
LoginInfo.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default LoginInfo;
