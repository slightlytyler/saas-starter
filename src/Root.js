import React, { PropTypes } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter, Match } from 'react-router';
import { CodeSplitProvider, CodeSplit } from 'code-split-component';
import { MuiThemeProvider } from 'material-ui/styles';
import { injectReducer } from './reducer';

const Root = ({ store }) => (
  <StoreProvider store={store}>
    <MuiThemeProvider>
      <CodeSplitProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CodeSplitProvider>
    </MuiThemeProvider>
  </StoreProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
