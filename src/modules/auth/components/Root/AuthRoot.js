import React from 'react';
import { Match } from 'react-router';
import { CodeSplit } from 'code-split-component';

export default ({ pathname }) => (
  <div>
    <Match 
      pattern={`${pathname}/login`} 
      render={() => (
         <CodeSplit 
          chunkName="AuthLogin" 
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
          modules={{ SignUp: require('../SignUp') }}
        >
          {({ SignUp }) => SignUp && <SignUp />}
        </CodeSplit>
      )} 
    />
  </div>
);
