import toArray from 'common/data/toArray';
import PageSpinner from 'components/PageSpinner';
import { compose, curry, every, get } from 'lodash/fp';
import { createElement } from 'react';

const awaitModules = (moduleKeys, left, right = PageSpinner) => props => (
  compose(every(get(curry.placeholder, props)), toArray)(moduleKeys)
    ? createElement(left, props)
    : createElement(right, props)
);

export default awaitModules;
