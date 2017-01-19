import { get } from 'lodash/fp';
import { createElement } from 'react';

const createElementFromProp = (path, propsMapper = () => ({})) => props => (
  createElement(get(path, props), propsMapper(props))
);

export default createElementFromProp;
