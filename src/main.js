import 'styles/index.styl';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './Root';
import store from './store';

injectTapEventPlugin();

ReactDOM.render(
  (
    <AppContainer>
      <Root store={store} />
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
          <HotRoot store={store} />
        </AppContainer>
      ),
      document.getElementById('root'),
    );
  });
}
