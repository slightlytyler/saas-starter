import React from 'react';
import { CodeSplit } from 'code-split-component';
import Match from 'react-router/Match'

export default () => (
  <Match
    pattern="/auth"
    render={({ pathname }) => (
      <CodeSplit 
        chunkName="AuthLogin" 
        modules={{ Login: require('../Login') }}
      >
        {({ Login }) => Login ? <Login basePathname={pathname} /> : <div>Loading</div>}
      </CodeSplit>
    )}
  />
);
