import awaitModules from 'common/components/awaitModules';
import createElementFromProp from 'common/components/createElementFromProp';
import AppLayout from 'components/AppLayout';
import CodeSplitRoute from 'components/CodeSplitRoute';
import { ConnectedRouter as Router } from 'connected-react-router';
import withCodeSplitting from 'containers/withCodeSplitting';
import withMuiTheme from 'containers/withMuiTheme';
import withStorage from 'containers/withStorage';
import withStore from 'containers/withStore';
import { compose } from 'lodash/fp';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import React, { PropTypes } from 'react';
import { Switch } from 'react-router';
import ibmTheme from 'styles/mui/theme';

const Root = ({ history, store }) => (
  <Router history={history}>
    <Switch>
      <CodeSplitRoute
        chunkName="auth"
        modules={{
          // eslint-disable-next-line global-require
          AuthRoot: require('modules/auth/components/Root'),
        }}
        path="/auth"
        render={awaitModules(
          'AuthRoot',
          createElementFromProp(
            'AuthRoot',
            ({ match }) => ({ ...match }),
          ),
        )}
      />
      <AuthenticatedRoute
        render={() => (
          <AppLayout>
            <Switch>
              <CodeSplitRoute
                chunkName="adapters"
                modules={{
                  // eslint-disable-next-line global-require
                  adaptersReducer: require('modules/adapters/reducer'),
                  // eslint-disable-next-line global-require
                  AdaptersRoot: require('modules/adapters/components/Root'),
                  // eslint-disable-next-line global-require
                  adaptersSagas: require('modules/adapters/sagas'),
                }}
                path="/adapters"
                render={awaitModules(
                  ['adaptersReducer', 'AdaptersRoot', 'adaptersSagas'],
                  ({ adaptersReducer, AdaptersRoot, adaptersSagas, match }) => {
                    if (adaptersReducer) {
                      store.injectReducer({ key: 'adapters', reducer: adaptersReducer });
                    }
                    if (adaptersSagas) {
                      store.injectSagas({ key: 'adapters', sagas: adaptersSagas });
                    }
                    return AdaptersRoot && <AdaptersRoot {...match} />;
                  },
                )}
              />
              <CodeSplitRoute
                chunkName="routes"
                modules={{
                  // eslint-disable-next-line global-require
                  RoutesRoot: require('modules/routes/components/Root'),
                }}
                path="/routes"
                render={awaitModules(
                  'RoutesRoot',
                  createElementFromProp(
                    'RoutesRoot',
                    ({ match }) => ({ ...match }),
                  ),
                )}
              />
              <CodeSplitRoute
                chunkName="users"
                modules={{
                  // eslint-disable-next-line global-require
                  UsersRoot: require('modules/users/components/Root'),
                }}
                path="/users"
                render={awaitModules(
                  'UsersRoot',
                  createElementFromProp(
                    'UsersRoot',
                    ({ match }) => ({ ...match }),
                  ),
                )}
              />
              <CodeSplitRoute
                chunkName="vendors"
                modules={{
                  // eslint-disable-next-line global-require
                  VendorsRoot: require('modules/vendors/components/Root'),
                }}
                path="/vendors"
                render={awaitModules(
                  'VendorsRoot',
                  createElementFromProp(
                    'VendorsRoot',
                    ({ match }) => ({ ...match }),
                  ),
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
