import React from 'react';
import { curry } from 'lodash/fp';

export default curry((props, element) => React.cloneElement(element, props));
