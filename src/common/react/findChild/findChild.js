import { compose, curry, find } from 'lodash/fp';
import React from 'react';

const findChild = curry((predicate, children) => compose(
  find(predicate),
  React.Children.toArray,
)(children));

export default findChild;
