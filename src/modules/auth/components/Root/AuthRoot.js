import matchPropType from 'common/propTypes/match';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChangePassword from '../ChangePassword';
import Login from '../Login';
import ResetPassword from '../ResetPassword';
import SignUp from '../SignUp';

const AuthRoot = ({ match }) => (
  <Switch>
    <Route component={ChangePassword} path={`${match.url}/change-password/:token`} />
    <Route component={Login} path={`${match.url}/login`} />
    <Route component={ResetPassword} path={`${match.url}/reset-password`} />
    <Route component={SignUp} path={`${match.url}/sign-up/:token`} />
  </Switch>
);

AuthRoot.propTypes = {
  match: matchPropType.isRequired,
};

export default AuthRoot;
