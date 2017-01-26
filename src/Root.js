import AppLayout from 'components/AppLayout';
import AdaptersRoot from 'modules/adapters/components/Root';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import AuthRoot from 'modules/auth/components/Root';
import RoutesRoot from 'modules/routes/components/Root';
import UsersRoot from 'modules/users/components/Root';
import VendorsRoot from 'modules/vendors/components/Root';
import React from 'react';
import { Route, Switch } from 'react-router';

const Root = () => (
  <Switch>
    <Route component={AuthRoot} path="/auth" />
    <AuthenticatedRoute
      render={() => (
        <AppLayout>
          <Switch>
            <Route component={AdaptersRoot} path="/adapters" />
            <Route component={RoutesRoot} path="/routes" />
            <Route component={UsersRoot} path="/users" />
            <Route component={VendorsRoot} path="/vendors" />
          </Switch>
        </AppLayout>
      )}
    />
  </Switch>
);

export default Root;
