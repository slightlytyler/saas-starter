import spinnerWhileLoading from 'containers/spinnerWhileLoading';
import withActions from 'containers/withActions';
import { compose, get } from 'lodash/fp';
import { registerToken } from 'modules/auth/actions';
import { selectIsAuthenticated } from 'modules/auth/selectors';
import { lifecycle, withState } from 'recompose';

const withStorage = compose(
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
  compose(spinnerWhileLoading, get)('loading'),
);

export default withStorage;
