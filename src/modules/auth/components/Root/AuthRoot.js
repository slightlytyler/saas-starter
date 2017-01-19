import awaitModules from 'common/components/awaitModules';
import createElementFromProp from 'common/components/createElementFromProp';
import CodeSplitRoute from 'components/CodeSplitRoute';
import React, { PropTypes } from 'react';
import { Switch } from 'react-router';

const AuthRoot = ({ pathname }) => (
  <Switch>
    <CodeSplitRoute
      chunkName="AuthLogin"
      modules={{
        // eslint-disable-next-line global-require
        Login: require('../Login'),
      }}
      path={`${pathname}/login`}
      render={awaitModules('Login', createElementFromProp('Login'))}
    />
    <CodeSplitRoute
      chunkName="AuthSignUp"
      modules={{
        // eslint-disable-next-line global-require
        SignUp: require('../SignUp'),
      }}
      path={`${pathname}/sign-up/:token`}
      render={awaitModules('SignUp', createElementFromProp('SignUp'))}
    />
    <CodeSplitRoute
      chunkName="AuthResetPassword"
      modules={{
        // eslint-disable-next-line global-require
        ResetPassword: require('../ResetPassword'),
      }}
      path={`${pathname}/reset-password`}
      render={awaitModules('ResetPassword', createElementFromProp('ResetPassword'))}
    />
    <CodeSplitRoute
      chunkName="AuthChangePassword"
      modules={{
        // eslint-disable-next-line global-require
        ChangePassword: require('../ChangePassword'),
      }}
      path={`${pathname}/change-password/:token`}
      render={awaitModules('ChangePassword', createElementFromProp('ChangePassword'))}
    />
  </Switch>
);

AuthRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AuthRoot;
