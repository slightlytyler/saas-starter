import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'lodash/fp';
import { applyMiddleware, createStore } from 'redux';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducer';
import Root from './Root';

const middleware = applyMiddleware();

const store = compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore)(reducer);

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
