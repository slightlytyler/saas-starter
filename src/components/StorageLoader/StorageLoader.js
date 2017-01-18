import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { registerToken } from 'modules/auth/actions';
import { selectIsAuthenticated } from 'modules/auth/selectors';
import { PropTypes } from 'react';
import { lifecycle, withState } from 'recompose';

const StorageLoader = ({ children, loading }) => children({ loading });

StorageLoader.propTypes = {
  children: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const container = compose(
  withActions({ registerToken }),
  withState('loading', 'setLoading', true),
  lifecycle({
    async componentWillMount() {
      await this.props.store.loadStorage();
      if (selectIsAuthenticated(this.props.store.getState())) {
        this.props.registerToken();
      }
      this.props.setLoading(false);
    },
  }),
);

export { StorageLoader as component, container };

export default container(StorageLoader);
