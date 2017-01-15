import ActionsProvider from 'components/ActionsProvider';
import Lifecycle from 'components/Lifecycle';
import StateProvider from 'components/StateProvider';
import { registerToken } from 'modules/auth/actions';
import { selectIsAuthenticated } from 'modules/auth/selectors';
import React, { PropTypes } from 'react';

const StorageLoader = ({ children, store }) => (
  <ActionsProvider creators={{ registerToken }}>
    {({ actions }) => (
      <StateProvider initialState={{ loading: true }}>
        {({ setState, state }) => (
          <Lifecycle
            componentWillMount={() => async () => {
              await store.loadStorage();
              if (selectIsAuthenticated(store.getState())) {
                actions.registerToken();
              }
              setState({ loading: false });
            }}
          >
            {children({ loading: state.loading })}
          </Lifecycle>
        )}
      </StateProvider>
    )}
  </ActionsProvider>
);

StorageLoader.propTypes = {
  children: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

export default StorageLoader;
