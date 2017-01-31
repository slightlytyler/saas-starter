import 'styles/index.styl';
import 'whatwg-fetch';
import ReactHotLoader from 'common/components/ReactHotLoader';
import StoreProvider from 'common/components/StoreProvider';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { compose, get } from 'lodash/fp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { withAsyncComponents } from 'react-async-component';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ibmTheme from 'styles/mui/theme';
import Root from './Root';
import createStore from './store';

injectTapEventPlugin();

const history = createBrowserHistory();

const store = createStore({ history });

const container = document.getElementById('root');

// eslint-disable-next-line react/no-render-return-value
const renderToDOM = element => ReactDOM.render(element, container);

const renderApp = Component => {
  const App = (
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
  withAsyncComponents(App).then(compose(renderToDOM, get('appWithAsyncComponents')));
};

renderApp(Root);

// require('./registerServiceWorker');

if (__DEV__ && module.hot) {
  module.hot.accept('./main.js');
  // eslint-disable-next-line global-require
  module.hot.accept('./Root', () => renderApp(require('./Root').default));
}
