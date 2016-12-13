import React, { PropTypes } from 'react';
import { compose, get, reduce } from 'lodash/fp';
import { connect } from 'react-redux';
import { signUp } from 'modules/auth/actions';

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

export const AuthSignUp = props => (
  <div>
    <header>Sign Up</header>
    <form onSubmit={handleSubmit(props.signUp)}>
      <label htmlFor="username">Username</label>
      <input name="username" />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
);

AuthSignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default connect(
  null,
  { signUp },
)(AuthSignUp);
