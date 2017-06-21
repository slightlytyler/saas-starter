import React from 'react';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Root from './Root';

const domNode = document.querySelector('#root');
const renderClient = () =>
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </AppContainer>,
    domNode,
  );

renderClient(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    renderClient();
  });
}
