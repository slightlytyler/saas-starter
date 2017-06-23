import React from 'react';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './Root';

injectTapEventPlugin();

const renderClient = () =>
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </AppContainer>,
    document.querySelector('#root'),
  );

renderClient(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    renderClient();
  });
}
