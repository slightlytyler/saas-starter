import spinnerWhileLoading from 'common/containers/spinnerWhileLoading';
import withActions from 'common/containers/withActions';
import { compose, get } from 'lodash/fp';
import { registerToken } from 'modules/auth/actions';
import { selectIsAuthenticated, selectToken } from 'modules/auth/selectors';
import { lifecycle, withState } from 'recompose';

const withStorage = compose(
  withActions({ registerToken }),
  withState('loading', 'setLoading', true),
  lifecycle({
    async componentDidMount() {
      await this.props.store.loadStorage();
      const state = this.props.store.getState();
      if (selectIsAuthenticated(state)) {
        this.props.registerToken({ token: selectToken(state) });
      }
      this.props.setLoading(false);
    },
  }),
  compose(spinnerWhileLoading, get)('loading'),
);

export default withStorage;
