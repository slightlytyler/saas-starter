import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { CodeSplit } from 'code-split-component';

const AuthRoot = ({ pathname }) => (
  <Switch>
    <Route
      path={`${pathname}/login`}
      render={() => (
        <CodeSplit
          chunkName="AuthLogin"
          // eslint-disable-next-line global-require
          modules={{ Login: require('../Login') }}
        >
          {({ Login }) => Login && <Login />}
        </CodeSplit>
      )}
    />
    <Route
      path={`${pathname}/sign-up/:token`}
      render={() => (
        <CodeSplit
          chunkName="AuthSignUp"
          // eslint-disable-next-line global-require
          modules={{ SignUp: require('../SignUp') }}
        >
          {({ SignUp }) => SignUp && <SignUp />}
        </CodeSplit>
      )}
    />
    <Route
      path={`${pathname}/reset-password`}
      render={() => (
        <CodeSplit
          chunkName="AuthResetPassword"
          // eslint-disable-next-line global-require
          modules={{ ResetPassword: require('../ResetPassword') }}
        >
          {({ ResetPassword }) => ResetPassword && <ResetPassword />}
        </CodeSplit>
      )}
    />
    <Route
      path={`${pathname}/change-password/:token`}
      render={() => (
        <CodeSplit
          chunkName="AuthChangePassword"
          // eslint-disable-next-line global-require
          modules={{ ChangePassword: require('../ChangePassword') }}
        >
          {({ ChangePassword }) => ChangePassword && <ChangePassword />}
        </CodeSplit>
      )}
    />
  </Switch>
);

AuthRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AuthRoot;
