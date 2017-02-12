import AppLayout from 'common/components/AppLayout';
import Home from 'common/components/Home';
import NoMatch from 'common/components/NoMatch';
import DialogsRoot from 'common/modules/dialogs/components/Root';
import ToastsRoot from 'common/modules/toasts/components/Root';
import AuthProvider from 'modules/auth/components/Provider';
import React from 'react';
import { Page } from 'react-layout-components';
import { Route, Switch } from 'react-router-dom';

const Root = () => (
  <AuthProvider>
    <Page>
      <AppLayout>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={NoMatch} />
        </Switch>
      </AppLayout>
      <DialogsRoot />
      <ToastsRoot />
    </Page>
  </AuthProvider>
);

export default Root;
