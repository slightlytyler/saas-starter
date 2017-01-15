import connect from 'common/redux/connect';
import React, { PropTypes } from 'react';
import { Match, Redirect } from 'react-router';
import { selectIsAuthenticated } from '../../selectors';

const MatchWhenAuthenticated = ({ isAuthenticated, render, ...rest }) => (
  <Match
    {...rest}
    render={props => (isAuthenticated ? render(props) : <Redirect to="/auth/login" />)}
  />
);

MatchWhenAuthenticated.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};

const container = connect(
  { isAuthenticated: selectIsAuthenticated },
);

export { MatchWhenAuthenticated as component, container };

export default container(MatchWhenAuthenticated);
