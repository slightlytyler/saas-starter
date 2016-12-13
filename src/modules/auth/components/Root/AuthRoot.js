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
      pattern={`${pathname}/sign-up`}
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
  </div>
);

AuthRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AuthRoot;
