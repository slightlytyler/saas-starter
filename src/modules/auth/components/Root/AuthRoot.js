import awaitProps from 'common/components/awaitProps';
import renderElementFromProp from 'common/components/renderElementFromProp';
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
      render={awaitProps('Login', renderElementFromProp('Login'))}
    />
    <CodeSplitRoute
      chunkName="AuthSignUp"
      modules={{
        // eslint-disable-next-line global-require
        SignUp: require('../SignUp'),
      }}
      path={`${path}/sign-up/:token`}
      render={awaitProps('SignUp', renderElementFromProp('SignUp'))}
    />
    <CodeSplitRoute
      chunkName="AuthResetPassword"
      modules={{
        // eslint-disable-next-line global-require
        ResetPassword: require('../ResetPassword'),
      }}
      path={`${path}/reset-password`}
      render={awaitProps('ResetPassword', renderElementFromProp('ResetPassword'))}
    />
    <CodeSplitRoute
      chunkName="AuthChangePassword"
      modules={{
        // eslint-disable-next-line global-require
        ChangePassword: require('../ChangePassword'),
      }}
      path={`${path}/change-password/:token`}
      render={awaitProps('ChangePassword', renderElementFromProp('ChangePassword'))}
    />
  </Switch>
);

AuthRoot.propTypes = {
  path: PropTypes.string.isRequired,
};

export default AuthRoot;
