import {render} from 'react-dom';
import app from './app';

const domNode = document.querySelector('#root');

app(render, domNode);

if (module.hot) {
  module.hot.accept('./app', () => {
    app(render, domNode);
  });
}
