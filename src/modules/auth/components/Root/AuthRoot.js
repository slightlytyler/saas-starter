import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { flattenProp } from 'recompose';
import ChangePassword from '../ChangePassword';
import Login from '../Login';
import ResetPassword from '../ResetPassword';
import SignUp from '../SignUp';

const AuthRoot = ({ path }) => (
  <Switch>
    <Route component={Login} path={`${path}/login`} />
    <Route component={SignUp} path={`${path}/sign-up`} />
    <Route component={ResetPassword} path={`${path}/reset-password`} />
    <Route component={ChangePassword} path={`${path}/change-password/:token`} />
  </Switch>
);

AuthRoot.propTypes = {
  path: PropTypes.string.isRequired,
};

export default flattenProp('match')(AuthRoot);
