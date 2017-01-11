import { CodeSplitProvider, CodeSplit } from 'code-split-component';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import React, { PropTypes } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter, Match } from 'react-router';
import ibmTheme from 'styles/mui/theme';
import { injectReducer } from './reducer';
import { injectSaga } from './sagas';

const Root = ({ store }) => (
  <StoreProvider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(ibmTheme)}>
      <CodeSplitProvider>
        <BrowserRouter>
          <div>
            <Match
              pattern="/auth"
              render={({ pathname }) => (
                <CodeSplit
                  chunkName="auth"
                  modules={{
                    // eslint-disable-next-line global-require
                    AuthRoot: require('./modules/auth/components/Root'),
                    // eslint-disable-next-line global-require
                    authReducer: require('./modules/auth/reducer'),
                    // eslint-disable-next-line global-require
                    authSagas: require('./modules/auth/sagas'),
                  }}
                >
                  {({ AuthRoot, authReducer, authSagas }) => {
                    if (authReducer) injectReducer(store, { key: 'auth', reducer: authReducer });
                    if (authSagas) injectSaga({ key: 'auth', sagas: authSagas });
                    return AuthRoot && <AuthRoot pathname={pathname} />;
                  }}
                </CodeSplit>
              )}
            />
            <Match
              pattern="/adapters"
              render={({ pathname }) => (
                <CodeSplit
                  chunkName="adapters"
                  modules={{
                    // eslint-disable-next-line global-require
                    AdaptersRoot: require('./modules/adapters/components/Root'),
                  }}
                >
                  {({ AdaptersRoot }) => AdaptersRoot && <AdaptersRoot pathname={pathname} />}
                </CodeSplit>
              )}
            />
          </div>
        </BrowserRouter>
      </CodeSplitProvider>
    </MuiThemeProvider>
  </StoreProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
