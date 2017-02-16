import 'whatwg-fetch';
import ReactHotLoader from 'common/components/ReactHotLoader';
import theme from 'styles/theme';
import {
  ConnectedRouter as Router,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { compose, get } from 'lodash/fp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getToken } from 'modules/auth/helpers';
import dialogsReducer from 'common/modules/dialogs/reducer';
import toastsReducer from 'common/modules/toasts/reducer';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { withAsyncComponents } from 'react-async-component';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { combineReducers } from 'redux';
import { API_URI } from './config';
import createClient from './createClient';
import createStore from './createStore';
import Root from './Root';

injectTapEventPlugin();

const client = createClient({
  customResolversFactory: ({ resolveObjectFromCache }) => ({
    Query: {
      User: resolveObjectFromCache,
      Comment: resolveObjectFromCache,
      Group: resolveObjectFromCache,
      Post: resolveObjectFromCache,
    },
  }),
  dataIdFromObject: get('id'),
  middleware: [{
    applyMiddleware: (req, next) => {
      if (!req.options.headers) {
        // eslint-disable-next-line no-param-reassign
        req.options.headers = {};
      }
      const token = getToken();
      if (token) {
        // eslint-disable-next-line no-param-reassign
        req.options.headers.authorization = `Bearer ${token}`;
      }
      next();
    },
  }],
  uri: API_URI,
});

const history = createBrowserHistory();

const store = createStore({
  middleware: [client.middleware(), routerMiddleware(history)],
  reducer: compose(connectRouter(history), combineReducers)({
    apollo: client.reducer(),
    dialogs: dialogsReducer,
    toasts: toastsReducer,
  }),
});

const container = document.getElementById('root');

// eslint-disable-next-line react/no-render-return-value
const renderToDOM = element => ReactDOM.render(element, container);

const renderApp = Component => {
  const App = (
    <ReactHotLoader>
      <MuiThemeProvider muiTheme={theme}>
        <ApolloProvider client={client} store={store}>
          <Router history={history}>
            <Component />
          </Router>
        </ApolloProvider>
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
