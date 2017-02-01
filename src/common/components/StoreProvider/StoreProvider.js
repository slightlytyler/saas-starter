import spinnerWhileLoading from 'common/containers/spinnerWhileLoading';
import { compose, get } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { lifecycle, withState } from 'recompose';

const StoreProvider = ({ children, store }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
};

const container = compose(
  withState('loading', 'setLoading', true),
  lifecycle({
    async componentDidMount() {
      await this.props.store.loadStorage();
      this.props.setLoading(false);
    },
  }),
  compose(spinnerWhileLoading, get)('loading'),
);

export default container(StoreProvider);
