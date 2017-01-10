import React, { PropTypes } from 'react';
import { Match } from 'react-router';
import { CodeSplit } from 'code-split-component';

const AuthRoot = ({ pathname }) => (
  <div>
    <Match
      pattern={`${pathname}/login`}
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
    <Match
      pattern={`${pathname}/sign-up/:token`}
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
    <Match
      pattern={`${pathname}/reset-password`}
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
    <Match
      pattern={`${pathname}/change-password/:token`}
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
  </div>
);

AuthRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AuthRoot;
