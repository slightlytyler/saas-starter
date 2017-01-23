import { get } from 'lodash/fp';
import React from 'react';

const defaultPropsMapper = () => ({});

const renderElementFromProp = (path, propsMapper = defaultPropsMapper) => props => {
  const Component = get(path, props);
  return <Component {...propsMapper(props)} />;
};

export default renderElementFromProp;
