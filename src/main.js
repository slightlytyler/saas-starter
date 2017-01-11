import 'styles/index.styl';
import 'whatwg-fetch';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './Root';
import createStore from './store';

injectTapEventPlugin();

const history = createBrowserHistory();

const store = createStore({ history });

ReactDOM.render(
  (
    <AppContainer>
      <Root history={history} store={store} />
    </AppContainer>
  ),
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line global-require
    const HotRoot = require('./Root').default;

    ReactDOM.render(
      (
        <AppContainer>
          <HotRoot history={history} store={store} />
        </AppContainer>
      ),
      document.getElementById('root'),
    );
  });
}
