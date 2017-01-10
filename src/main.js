import 'regenerator-runtime/runtime';
import 'styles/index.styl';
import 'whatwg-fetch';
import { compose } from 'lodash/fp';
import goalsSagas from 'modules/goals/sagas';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import Root from './Root';

injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

const store = compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore)(reducer);

sagaMiddleware.run(goalsSagas);

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
