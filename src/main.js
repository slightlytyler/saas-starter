import 'styles/index.styl';
import 'whatwg-fetch';
import { ConnectedRouter as Router } from 'connected-react-router';
import ReactHotLoader from 'components/ReactHotLoader';
import StoreProvider from 'components/StoreProvider';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { withAsyncComponents } from 'react-async-component';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ibmTheme from 'styles/mui/theme';
import Root from './Root';
import createStore from './store';

injectTapEventPlugin();

const history = createBrowserHistory();

const store = createStore({ history });

const container = document.getElementById('root');

const renderApp = Component => {
  const app = (
    <ReactHotLoader>
      <MuiThemeProvider muiTheme={ibmTheme}>
        <StoreProvider store={store}>
          <Router history={history}>
            <Component />
          </Router>
        </StoreProvider>
      </MuiThemeProvider>
    </ReactHotLoader>
  );

  withAsyncComponents(app).then(({ appWithAsyncComponents }) => (
    render(appWithAsyncComponents, container)
  ));
};

renderApp(Root);

// require('./registerServiceWorker');

if (__DEV__ && module.hot) {
  module.hot.accept('./main.js');
  // eslint-disable-next-line global-require
  module.hot.accept('./Root', () => renderApp(require('./Root').default));
}
