import { curry } from 'lodash/fp';
import React from 'react';

const mapChildren = curry((iteratee, children) => React.Children.map(children, iteratee));

export default mapChildren;
