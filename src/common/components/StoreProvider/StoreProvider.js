import withStorage from 'common/containers/withStorage';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

const StoreProvider = ({ children, store }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStorage(StoreProvider);
