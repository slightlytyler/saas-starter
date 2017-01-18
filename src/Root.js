import { CodeSplit } from 'code-split-component';
import AppLayout from 'components/AppLayout';
import { ConnectedRouter as Router } from 'connected-react-router';
import withCodeSplitting from 'containers/withCodeSplitting';
import withMuiTheme from 'containers/withMuiTheme';
import withStorage from 'containers/withStorage';
import withStore from 'containers/withStore';
import { compose } from 'lodash/fp';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import ibmTheme from 'styles/mui/theme';

const Root = ({ history, store }) => (
  <Router history={history}>
    <Switch>
      <Route
        path="/auth"
        render={({ match }) => (
          <CodeSplit
            chunkName="auth"
            modules={{
              // eslint-disable-next-line global-require
              AuthRoot: require('modules/auth/components/Root'),
            }}
          >
            {({ AuthRoot }) => AuthRoot && <AuthRoot pathname={match.path} />}
          </CodeSplit>
        )}
      />
      <AuthenticatedRoute
        render={() => (
          <AppLayout>
            <Switch>
              <Route
                path="/adapters"
                render={({ match }) => (
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
                        store.injectSagas({ key: 'adapters', sagas: adaptersSagas });
                      }
                      return AdaptersRoot && <AdaptersRoot pathname={match.path} />;
                    }}
                  </CodeSplit>
                )}
              />
              <Route
                path="/routes"
                render={({ match }) => (
                  <CodeSplit
                    chunkName="routes"
                    modules={{
                      // eslint-disable-next-line global-require
                      RoutesRoot: require('modules/routes/components/Root'),
                    }}
                  >
                    {({ RoutesRoot }) => (
                      RoutesRoot && <RoutesRoot pathname={match.path} />
                    )}
                  </CodeSplit>
                )}
              />
              <Route
                path="/users"
                render={({ match }) => (
                  <CodeSplit
                    chunkName="users"
                    modules={{
                      // eslint-disable-next-line global-require
                      UsersRoot: require('modules/users/components/Root'),
                    }}
                  >
                    {({ UsersRoot }) => (
                      UsersRoot && <UsersRoot pathname={match.path} />
                    )}
                  </CodeSplit>
                )}
              />
              <Route
                path="/vendors"
                render={({ match }) => (
                  <CodeSplit
                    chunkName="vendors"
                    modules={{
                      // eslint-disable-next-line global-require
                      VendorsRoot: require('modules/vendors/components/Root'),
                    }}
                  >
                    {({ VendorsRoot }) => (
                      VendorsRoot && <VendorsRoot pathname={match.path} />
                    )}
                  </CodeSplit>
                )}
              />
            </Switch>
          </AppLayout>
        )}
      />
    </Switch>
  </Router>
);

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default compose(
  withCodeSplitting,
  withMuiTheme(ibmTheme),
  withStore,
  withStorage,
)(Root);
