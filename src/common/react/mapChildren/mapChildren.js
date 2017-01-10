import React from 'react';
import { curry } from 'lodash/fp';

export default curry((iteratee, children) => React.Children.map(children, iteratee));
