import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'lodash/fp';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppContainer } from 'react-hot-loader';
import goalsSagas from 'modules/goals/sagas';
import reducer from './reducer';
import Root from './Root';

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
