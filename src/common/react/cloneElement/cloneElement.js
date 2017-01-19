import { curry } from 'lodash/fp';
import React from 'react';

const cloneElement = curry((props, element) => React.cloneElement(element, props));

export default cloneElement;
