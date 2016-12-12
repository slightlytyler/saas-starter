import React from 'react';
import { compose, get, reduce } from 'lodash/fp';

const getFormValue = compose(
  reduce(
    (acc, el) => el.name ? { ...acc, [el.name]: el.value } : acc,
    {},
  ),
  get('elements')
);

const handleSubmit = action => e => {
  e.preventDefault();
  compose(action, getFormValue)(e.target);
};

export const AuthLogin = ({ login }) => (
  <div>
    <header>Login</header>
    <form onSubmit={handleSubmit(login)}>
      <label htmlFor="username">Username</label>
      <input name="username" />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
);

import { connect } from 'react-redux';
import { login } from 'modules/auth/actions';

export default connect(
  null,
  { login }
)(AuthLogin);
