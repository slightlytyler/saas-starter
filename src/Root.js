import DialogsRoot from 'common/modules/dialogs/components/Root';
import ToastsRoot from 'common/modules/toasts/components/Root';
import AppLayout from 'components/AppLayout';
import AdaptersRoot from 'modules/adapters/components/Root';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import AuthRoot from 'modules/auth/components/Root';
import RoutesRoot from 'modules/routes/components/Root';
import UsersRoot from 'modules/users/components/Root';
import VendorsRoot from 'modules/vendors/components/Root';
import React from 'react';
import { Page } from 'react-layout-components';
import { Route, Switch } from 'react-router-dom';

const Root = () => (
  <Page>
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
    <DialogsRoot />
    <ToastsRoot />
  </Page>
);

export default Root;
