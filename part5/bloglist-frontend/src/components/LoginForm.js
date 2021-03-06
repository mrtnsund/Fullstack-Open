import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          placeholder="Enter username..."
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          placeholder="Enter password..."
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
