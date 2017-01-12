import { CodeSplitProvider, CodeSplit } from 'code-split-component';
import StorageLoader from 'components/StorageLoader';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import MatchWhenAuthenticated from 'modules/auth/components/MatchWhenAuthenticated';
import React, { PropTypes } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Match } from 'react-router';
import ibmTheme from 'styles/mui/theme';
import { injectSaga } from './sagas';

const Root = ({ history, store }) => (
  <StoreProvider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(ibmTheme)}>
      <CodeSplitProvider>
        <StorageLoader store={store}>
          {({ loading }) => {
            if (loading) return <div>Loading</div>;
            return (
              <ConnectedRouter history={history}>
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
                          authSagas: require('./modules/auth/sagas'),
                        }}
                      >
                        {({ AuthRoot, authSagas }) => {
                          if (authSagas) injectSaga({ key: 'auth', sagas: authSagas });
                          return AuthRoot && <AuthRoot pathname={pathname} />;
                        }}
                      </CodeSplit>
                    )}
                  />
                  <MatchWhenAuthenticated
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
              </ConnectedRouter>
            );
          }}
        </StorageLoader>
      </CodeSplitProvider>
    </MuiThemeProvider>
  </StoreProvider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Root;
