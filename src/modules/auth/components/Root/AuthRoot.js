import awaitModules from 'common/components/awaitModules';
import createElementFromProp from 'common/components/createElementFromProp';
import CodeSplitRoute from 'components/CodeSplitRoute';
import React, { PropTypes } from 'react';
import { Switch } from 'react-router';

const AuthRoot = ({ path }) => (
  <Switch>
    <CodeSplitRoute
      chunkName="AuthLogin"
      modules={{
        // eslint-disable-next-line global-require
        Login: require('../Login'),
      }}
      path={`${path}/login`}
      render={awaitModules('Login', createElementFromProp('Login'))}
    />
    <CodeSplitRoute
      chunkName="AuthSignUp"
      modules={{
        // eslint-disable-next-line global-require
        SignUp: require('../SignUp'),
      }}
      path={`${path}/sign-up/:token`}
      render={awaitModules('SignUp', createElementFromProp('SignUp'))}
    />
    <CodeSplitRoute
      chunkName="AuthResetPassword"
      modules={{
        // eslint-disable-next-line global-require
        ResetPassword: require('../ResetPassword'),
      }}
      path={`${path}/reset-password`}
      render={awaitModules('ResetPassword', createElementFromProp('ResetPassword'))}
    />
    <CodeSplitRoute
      chunkName="AuthChangePassword"
      modules={{
        // eslint-disable-next-line global-require
        ChangePassword: require('../ChangePassword'),
      }}
      path={`${path}/change-password/:token`}
      render={awaitModules('ChangePassword', createElementFromProp('ChangePassword'))}
    />
  </Switch>
);

AuthRoot.propTypes = {
  path: PropTypes.string.isRequired,
};

export default AuthRoot;
