import { CodeSplitProvider, CodeSplit } from 'code-split-component';
import AppLayout from 'components/AppLayout';
import StorageLoader from 'components/StorageLoader';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import MatchWhenAuthenticated from 'modules/auth/components/MatchWhenAuthenticated';
import React, { PropTypes } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Match, Redirect } from 'react-router';
import ibmTheme from 'styles/mui/theme';

const muiTheme = getMuiTheme(ibmTheme);

const Root = ({ history, store }) => (
  <StoreProvider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <CodeSplitProvider>
        <StorageLoader store={store}>
          {({ loading }) => {
            if (loading) return <div>Loading</div>;
            return (
              <ConnectedRouter history={history}>
                <div>
                  <MatchWhenAuthenticated
                    exactly
                    pattern="/"
                    render={() => (<Redirect to="/adapters" />)}
                  />
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
                  <AppLayout>
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
                            adaptersSagas: require('modules/adapters/sagas'),
                          }}
                        >
                          {({ adaptersReducer, AdaptersRoot, adaptersSagas }) => {
                            if (adaptersReducer) {
                              store.injectReducer({ key: 'adapters', reducer: adaptersReducer });
                            }
                            if (adaptersSagas) {
                              store.injectSagas(adaptersSagas);
                            }
                            return AdaptersRoot && <AdaptersRoot pathname={pathname} />;
                          }}
                        </CodeSplit>
                      )}
                    />
                    <MatchWhenAuthenticated
                      pattern="/routes"
                      render={({ pathname }) => (
                        <CodeSplit
                          chunkName="routes"
                          modules={{
                            // eslint-disable-next-line global-require
                            RoutesRoot: require('modules/routes/components/Root'),
                          }}
                        >
                          {({ RoutesRoot }) => (
                            RoutesRoot && <RoutesRoot pathname={pathname} />
                          )}
                        </CodeSplit>
                      )}
                    />
                    <MatchWhenAuthenticated
                      pattern="/users"
                      render={({ pathname }) => (
                        <CodeSplit
                          chunkName="users"
                          modules={{
                            // eslint-disable-next-line global-require
                            UsersRoot: require('modules/users/components/Root'),
                          }}
                        >
                          {({ UsersRoot }) => (
                            UsersRoot && <UsersRoot pathname={pathname} />
                          )}
                        </CodeSplit>
                      )}
                    />
                    <MatchWhenAuthenticated
                      pattern="/vendors"
                      render={({ pathname }) => (
                        <CodeSplit
                          chunkName="vendors"
                          modules={{
                            // eslint-disable-next-line global-require
                            VendorsRoot: require('modules/vendors/components/Root'),
                          }}
                        >
                          {({ VendorsRoot }) => (
                            VendorsRoot && <VendorsRoot pathname={pathname} />
                          )}
                        </CodeSplit>
                      )}
                    />
                  </AppLayout>
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
