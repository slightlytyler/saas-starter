import 'common/styles/index.styl';
import 'whatwg-fetch';
import ApolloClient, { createNetworkInterface, toIdValue } from 'apollo-client';
import ReactHotLoader from 'common/components/ReactHotLoader';
import ibmTheme from 'common/styles/mui/theme';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { compose, get } from 'lodash/fp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { withAsyncComponents } from 'react-async-component';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { API_URI, LOCAL_STORAGE_AUTH_KEY } from './config';
import Root from './Root';
import createStore from './store';

injectTapEventPlugin();

const dataIdFromObject = get('id');

const resolveRecordFromCache = (_, { id }) => toIdValue(dataIdFromObject({ id }));

const networkInterface = createNetworkInterface({ uri: API_URI });

networkInterface.use([{
  applyMiddleware: (req, next) => {
    if (!req.options.headers) {
      // eslint-disable-next-line no-param-reassign
      req.options.headers = {};
    }

    if (localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) {
      // eslint-disable-next-line no-param-reassign
      req.options.headers.authorization = `Bearer ${localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)}`;
    }
    next();
  },
}]);

const client = new ApolloClient({
  customResolvers: {
    Query: {
      User: resolveRecordFromCache,
      Comment: resolveRecordFromCache,
      Group: resolveRecordFromCache,
      Post: resolveRecordFromCache,
    },
  },
  dataIdFromObject,
  networkInterface,
});

const history = createBrowserHistory();

const store = createStore({ history, reducers: { apollo: client.reducer() } });

const container = document.getElementById('root');

// eslint-disable-next-line react/no-render-return-value
const renderToDOM = element => ReactDOM.render(element, container);

const renderApp = Component => {
  const App = (
    <ReactHotLoader>
      <MuiThemeProvider muiTheme={ibmTheme}>
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
