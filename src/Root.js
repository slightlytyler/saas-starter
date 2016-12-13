import React, { PropTypes } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter, Link, Match } from 'react-router';
import { CodeSplitProvider, CodeSplit } from 'code-split-component';
import { injectReducer } from './reducer';

const Root = ({ store }) => (
  <StoreProvider store={store}>
    <CodeSplitProvider>
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Index</Link></li>
            <li><Link to="/auth/login">Login</Link></li>
            <li><Link to="/auth/sign-up">Sign Up</Link></li>
            <li><Link to="/home">Home</Link></li>
          </ul>
          <hr />
          <Match
            pattern="/auth"
            render={({ pathname }) => (
              <CodeSplit
                chunkName="Auth"
                modules={{
                  // eslint-disable-next-line global-require
                  AuthRoot: require('./modules/auth/components/Root'),
                  // eslint-disable-next-line global-require
                  authReducer: require('./modules/auth/reducer'),
                }}
              >
                {({ AuthRoot, authReducer }) => {
                  if (authReducer) injectReducer(store, { key: 'auth', reducer: authReducer });
                  return AuthRoot && <AuthRoot pathname={pathname} />;
                }}
              </CodeSplit>
            )}
          />
          <Match
            pattern="/home"
            render={() => (
              <CodeSplit
                chunkName="Home"
                // eslint-disable-next-line global-require
                modules={{ Home: require('./modules/home/components/Root') }}
              >
                {({ Home }) => Home && <Home />}
              </CodeSplit>
            )}
          />
        </div>
      </BrowserRouter>
    </CodeSplitProvider>
  </StoreProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
