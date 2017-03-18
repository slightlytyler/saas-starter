import AppLayout from 'common/components/AppLayout';
import NoMatch from 'common/components/NoMatch';
import injectStyles from 'common/containers/injectStyles';
import DialogsRoot from 'common/modules/dialogs/components/Root';
import ToastsRoot from 'common/modules/toasts/components/Root';
import AuthProvider from 'modules/auth/components/AuthProvider';
import React from 'react';
import { Page } from 'react-layout-components';
import { Route, Switch } from 'react-router-dom';
import * as colors from 'styles/colors';

const Root = () => (
  <AuthProvider>
    <Page>
      <AppLayout>
        <Switch>
          <Route component={NoMatch} />
        </Switch>
      </AppLayout>
      <DialogsRoot />
      <ToastsRoot />
    </Page>
  </AuthProvider>
);

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box',
      textRendering: 'geometricPrecision',
    },
    '@global html': {
      backgroundColor: colors.white3,
      fontSize: '100%',
      fontFamily: 'Roboto, sans-serif',
    },
    '@global body': {
      margin: 0,
    },
    '@global .react-layout-components--box': {
      display: 'flex',
    },
  },
};

const container = injectStyles(styles);

export default container(Root);
