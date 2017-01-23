import AppLayout from 'components/AppLayout';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import AuthRoot from 'modules/auth/components/Root';
import AdaptersRoot from 'modules/adapters/components/Root';
import RoutesRoot from 'modules/routes/components/Root';
import UsersRoot from 'modules/users/components/Root';
import VendorsRoot from 'modules/vendors/components/Root';
import React from 'react';
import { Route, Switch } from 'react-router';

const Root = () => (
  <Switch>
    <Route
      path="/auth"
      render={({ match }) => <AuthRoot {...match} />}
    />
    <AuthenticatedRoute
      render={() => (
        <AppLayout>
          <Switch>
            <Route
              path="/adapters"
              render={({ match }) => <AdaptersRoot {...match} />}
            />
            <Route
              path="/routes"
              render={({ match }) => <RoutesRoot {...match} />}
            />
            <Route
              path="/users"
              render={({ match }) => <UsersRoot {...match} />}
            />
            <Route
              path="/vendors"
              render={({ match }) => <VendorsRoot {...match} />}
            />
          </Switch>
        </AppLayout>
      )}
    />
  </Switch>
);

export default Root;
