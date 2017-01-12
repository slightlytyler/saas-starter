import React, { PropTypes } from 'react';
import Lifecycle from 'components/Lifecycle';
import StateProvider from 'components/StateProvider';

const StorageLoader = ({ children, store }) => (
  <StateProvider initialState={{ loading: true }}>
    {({ setState, state }) => (
      <Lifecycle
        componentWillMount={() => async () => {
          await store.loadStorage();
          setState({ loading: false });
        }}
      >
        {children({ loading: state.loading })}
      </Lifecycle>
    )}
  </StateProvider>
);

StorageLoader.propTypes = {
  children: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

export default StorageLoader;
