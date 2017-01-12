import connect from 'common/redux/connect';
import React, { PropTypes } from 'react';
import { Match, Redirect } from 'react-router';

const Authenticator = ({ isAuthenticated, render, ...rest }) => (
  <Match
    {...rest}
    render={props => (
      isAuthenticated
        ? render(props)
        : <Redirect to={{ pathname: '/auth/login' }} />
    )}
  />
);

Authenticator.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};

const container = connect(
  state => ({
    isAuthenticated: Boolean(state.auth.token),
  }),
);

export { Authenticator as component, container };

export default container(Authenticator);
