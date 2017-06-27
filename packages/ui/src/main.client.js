// @flow
import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import { BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './Root';

injectTapEventPlugin();

const networkInterface = createNetworkInterface({
  initialState: {
    apollo: window.env.APOLLO_STATE,
  },
  uri: window.env.API_URL,
});
const client = new ApolloClient({ networkInterface });
const renderClient = () => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ApolloProvider>
    </AppContainer>,
    document.querySelector('#root'),
  );
};

renderClient();

if (module.hot) {
  module.hot.accept('./Root', () => {
    renderClient();
  });
}
