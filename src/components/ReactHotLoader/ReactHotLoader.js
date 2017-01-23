/* eslint-disable global-require */
import { compose, get } from 'lodash/fp';
import React from 'react';

const ReactHotLoader = (
  __DEV__
    ? require('react-hot-loader').AppContainer
    : compose(React.Children.only, get('children'))
);

export default ReactHotLoader;
