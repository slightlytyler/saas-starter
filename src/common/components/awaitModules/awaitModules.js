import toArray from 'common/data/toArray';
import PageSpinner from 'components/PageSpinner';
import { compose, curry, every, get } from 'lodash/fp';
import React from 'react';

const renderPageSpinner = () => <PageSpinner />;

const awaitModules = (moduleKeys, left, right = renderPageSpinner) => props => (
  compose(every(get(curry.placeholder, props)), toArray)(moduleKeys)
    ? left(props)
    : right(props)
);

export default awaitModules;
