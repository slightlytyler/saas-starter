import awaitProps from 'common/components/awaitProps';
import renderElementFromProp from 'common/components/renderElementFromProp';
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
        render={awaitProps(
          'AuthRoot',
          renderElementFromProp(
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
                  adapters: require('modules/adapters'),
                }}
                path="/adapters"
                render={awaitProps(
                  'adapters',
                  ({ adapters: { init, Root: AdaptersRoot }, match }) => {
                    init(store);
                    return <AdaptersRoot {...match} />;
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
                render={awaitProps(
                  'RoutesRoot',
                  renderElementFromProp(
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
                render={awaitProps(
                  'UsersRoot',
                  renderElementFromProp(
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
                render={awaitProps(
                  'VendorsRoot',
                  renderElementFromProp(
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
