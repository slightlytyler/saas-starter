import { CodeSplitProvider, CodeSplit } from 'code-split-component';
import StorageLoader from 'components/StorageLoader';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import MatchWhenAuthenticated from 'modules/auth/components/MatchWhenAuthenticated';
import React, { PropTypes } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Match } from 'react-router';
import ibmTheme from 'styles/mui/theme';

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
                          AuthRoot: require('modules/auth/components/Root'),
                        }}
                      >
                        {({ AuthRoot }) => AuthRoot && <AuthRoot pathname={pathname} />}
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
                          adaptersReducer: require('modules/adapters/reducer'),
                          // eslint-disable-next-line global-require
                          AdaptersRoot: require('modules/adapters/components/Root'),
                          // eslint-disable-next-line global-require
                          adaptersSaga: require('modules/adapters/sagas'),
                        }}
                      >
                        {({ adaptersReducer, AdaptersRoot, adaptersSaga }) => {
                          if (adaptersReducer) {
                            store.injectReducer({ key: 'adapters', reducer: adaptersReducer });
                          }
                          if (adaptersSaga) {
                            store.injectSaga({ key: 'adapters', saga: adaptersSaga });
                          }
                          return AdaptersRoot && <AdaptersRoot pathname={pathname} />;
                        }}
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
