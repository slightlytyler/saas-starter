import React, { PropTypes } from 'react';
import { compose, get, reduce } from 'lodash/fp';
import { connect } from 'react-redux';
import { login } from 'modules/auth/actions';

const getFormValue = compose(
  reduce(
    (acc, el) => (el.name ? { ...acc, [el.name]: el.value } : acc),
    {},
  ),
  get('elements'),
);

const handleSubmit = action => e => {
  e.preventDefault();
  return compose(action, getFormValue)(e.target);
};

export const AuthLogin = props => (
  <div>
    <header>Login</header>
    <form onSubmit={handleSubmit(props.login)}>
      <label htmlFor="username">Username</label>
      <input name="username" />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
);

AuthLogin.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(
  null,
  { login },
)(AuthLogin);
