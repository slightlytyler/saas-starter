import connect from 'common/redux/connect';
import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router';
import { selectIsAuthenticated } from '../../selectors';

const AuthenticatedRoute = ({ isAuthenticated, render, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? render(props) : <Redirect to="/auth/login" />)}
  />
);

AuthenticatedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};

const container = connect(
  { isAuthenticated: selectIsAuthenticated },
);

export { AuthenticatedRoute as component, container };

export default container(AuthenticatedRoute);
